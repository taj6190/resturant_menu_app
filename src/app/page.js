"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import menuData from "../data/menu.json";
import MenuCategory from "../components/MenuCategory";
import Header from "../components/Header";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const tabsRef = useRef(null);

  // Auto-scroll tabs when active category changes
  useEffect(() => {
    if (tabsRef.current && activeCategory) {
      const activeTab = tabsRef.current.querySelector(`[data-tab="${activeCategory}"]`);
      if (activeTab) {
        activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [activeCategory]);

  const { categories, items } = menuData;

  /* ----------------------------
     FILTER ITEMS (OPTIMIZED)
  ---------------------------- */
  const filteredItems = useMemo(() => {
    if (!searchQuery) return items;

    const q = searchQuery.toLowerCase();

    return items.filter((item) => {
      return (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.dietary_tags?.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, items]);

  /* ----------------------------
     GROUP BY CATEGORY
  ---------------------------- */
  const grouped = useMemo(() => {
    let result = categories
      .map((cat) => ({
        ...cat,
        items: filteredItems.filter((i) => i.category === cat.id),
      }))
      .filter((c) => c.items.length > 0);

    const deals = filteredItems.filter((i) => i.original_price);
    if (deals.length > 0) {
      result.unshift({
        id: "deals",
        name: "🔥 Deals",
        items: deals,
      });
    }

    return result;
  }, [filteredItems, categories]);

  const categoryIds = useMemo(
    () => grouped.map((c) => c.id),
    [grouped]
  );

  /* ----------------------------
     SCROLL SPY (FIXED + STABLE)
  ---------------------------- */
  useEffect(() => {
    if (searchQuery) return;

    const sections = categoryIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let best = null;
        let ratio = 0;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > ratio) {
            best = entry;
            ratio = entry.intersectionRatio;
          }
        });

        if (best?.target?.id) {
          setActiveCategory(best.target.id);
        }
      },
      {
        threshold: 0.3,
        rootMargin: "-120px 0px -55% 0px",
      }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, [searchQuery, categoryIds]);

  /* ----------------------------
     SMOOTH SCROLL (FIXED)
  ---------------------------- */
  const scrollToCategory = (id) => {
    setActiveCategory(id);

    const el = document.getElementById(id);
    if (!el) return;

    const headerOffset = 100;

    const top =
      el.getBoundingClientRect().top +
      window.scrollY -
      headerOffset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  /* ----------------------------
     UI
  ---------------------------- */
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="pt-20 md:pt-24">

        {/* HERO */}
        <div className="max-w-[1200px] mx-auto px-4 xl:px-0">
          <div className="relative overflow-hidden rounded-3xl h-[30vh] md:h-[40vh] shadow-sm bg-black">

            <img
              src="https://loremflickr.com/1600/800/food,restaurant"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            <div className="absolute bottom-0 p-6 md:p-10 text-white">
              <p className="text-xs tracking-[0.2em] text-white/70 uppercase">
                Menu
              </p>
              <h1 className="text-3xl md:text-5xl font-bold mt-2">
                Fresh. Fast. Flavorful.
              </h1>
              <p className="text-white/70 mt-2 max-w-md">
                Discover dishes made with passion and precision.
              </p>
            </div>
          </div>
        </div>

        {/* SEARCH */}
        <div className="max-w-[1200px] mx-auto px-4 xl:px-0 -mt-6 relative z-10">
          <div className="max-w-[700px] mx-auto bg-white shadow-md border border-slate-100 rounded-2xl flex items-center px-4 py-3">

            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>

            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes..."
              className="w-full px-3 py-2 outline-none text-sm font-medium"
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-slate-400 hover:text-black"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* CATEGORY TABS */}
        {!searchQuery && (
          <div className="sticky top-15 z-40 bg-slate-50/80 backdrop-blur-xl mt-6 border-b border-slate-100">
            <div ref={tabsRef} className="max-w-[1200px] mx-auto px-4 xl:px-0 py-3 flex md:justify-center gap-2 overflow-x-auto scrollbar-hide scroll-smooth">

              {grouped.map((cat) => (
                <button
                  key={cat.id}
                  data-tab={cat.id}
                  onClick={() => scrollToCategory(cat.id)}
                  className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition ${activeCategory === cat.id
                    ? "bg-black text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                    }`}
                >
                  {cat.name}
                </button>
              ))}

            </div>
          </div>
        )}

        {/* RESULTS */}
        {searchQuery && (
          <div className="max-w-[1200px] mx-auto px-4 xl:px-0 mt-6 text-sm text-slate-500">
            {filteredItems.length} results found
          </div>
        )}

        {/* MENU */}
        <div className="max-w-[1200px] mx-auto px-4 xl:px-0 mt-8 pb-24 space-y-12">

          {grouped.length > 0 ? (
            grouped.map((category) => (
              <MenuCategory key={category.id} category={category} />
            ))
          ) : (
            <div className="text-center py-20 text-slate-500">
              No items found
            </div>
          )}

        </div>

      </main>
    </div>
  );
}