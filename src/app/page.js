"use client";
import React, { useState, useEffect } from "react";
import menuData from "../data/menu.json";
import MenuCategory from "../components/MenuCategory";
import Header from "../components/Header";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const { categories, items } = menuData;

  const filteredItems = items.filter(item => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return item.name.toLowerCase().includes(query) || 
           item.description.toLowerCase().includes(query) || 
           (item.dietary_tags && item.dietary_tags.some(tag => tag.toLowerCase().includes(query)));
  });

  let itemsByCategory = categories.map(category => ({
    ...category,
    items: filteredItems.filter(item => item.category === category.id)
  })).filter(cat => cat.items.length > 0);

  const discountedItems = filteredItems.filter(item => item.original_price);
  if (discountedItems.length > 0) {
    itemsByCategory.unshift({ id: "deals", name: "🔥 Super Deals", items: discountedItems });
  }

  const displayCategories = searchQuery 
    ? itemsByCategory 
    : itemsByCategory.filter(cat => activeCategory === "all" || cat.id === activeCategory);

  // Handle intersection observer for active tabs when scrolling
  useEffect(() => {
    if (searchQuery) return; // Don't track scroll during search

    const observer = new IntersectionObserver((entries) => {
      // Find the most visible section
      const visibleSection = entries.find(entry => entry.isIntersecting);
      if (visibleSection && visibleSection.intersectionRatio > 0.1) {
        setActiveCategory(visibleSection.target.id);
      }
    }, { rootMargin: "-120px 0px -60% 0px", threshold: 0.1 });

    document.querySelectorAll("section[id]").forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, [searchQuery]);

  const scrollToCategory = (id) => {
    setActiveCategory(id);
    if (id === 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 100; // Account for header + sticky tabs
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-[72px] md:pt-[88px]"> {/* Offset for fixed header */}
        
        {/* BEAUTIFUL COMPACT HERO */}
        <div className="relative h-[25vh] md:h-[35vh] min-h-[220px] bg-slate-900 overflow-hidden mx-4 md:mx-6 lg:mx-auto max-w-[1200px] rounded-2xl md:rounded-[2rem] mt-4 mb-8 shadow-elegant group">
          <img 
            src="https://loremflickr.com/1200/600/restaurant,dark,food" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            alt="Restaurant Atmosphere"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 animate-fade-in">
            <span className="inline-block bg-accent/90 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-widest mb-3 w-max">
              Experience
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-2">
              Authentic Flavors.
            </h1>
            <p className="text-sm md:text-lg text-slate-300 font-medium max-w-md">
              Deshi-style Chinese cooked with passion.
            </p>
          </div>
        </div>

        <div className="container pb-20">
          
          {/* SLEEK SEARCH */}
          <div className="mb-6 relative z-10 max-w-2xl mx-auto">
            <div className="relative group shadow-sm rounded-2xl overflow-hidden bg-white border border-slate-100 focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/10 transition-all">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-slate-400 group-focus-within:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="text" 
                className="w-full py-4 pl-12 pr-4 text-sm font-semibold text-slate-900 outline-none bg-transparent placeholder-slate-400" 
                placeholder="Search dishes, ingredients, or tags..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              )}
            </div>
          </div>

          {/* STICKY PILL TABS */}
          {!searchQuery && itemsByCategory.length > 0 && (
            <div className="sticky top-[72px] md:top-[88px] z-40 bg-var(--color-surface)/95 backdrop-blur-xl -mx-4 px-4 md:mx-0 md:px-0 py-3 mb-8 shadow-[0_10px_10px_-10px_rgba(0,0,0,0.05)]">
              <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-hide snap-x">
                <button 
                  className={`px-5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all snap-start shrink-0 ${
                    activeCategory === 'all' 
                      ? 'bg-slate-900 text-white shadow-md scale-100' 
                      : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50 scale-95 hover:scale-100'
                  }`}
                  onClick={() => scrollToCategory('all')}
                >
                  All Items
                </button>
                {itemsByCategory.map(cat => (
                  <button 
                    key={cat.id} 
                    className={`px-5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all snap-start shrink-0 flex items-center gap-2 ${
                      activeCategory === cat.id 
                        ? 'bg-slate-900 text-white shadow-md scale-100' 
                        : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50 scale-95 hover:scale-100'
                    }`}
                    onClick={() => scrollToCategory(cat.id)}
                  >
                    {cat.name.includes("🔥") && <span className="text-sm">🔥</span>}
                    {cat.name.replace("🔥 ", "")}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* RESULTS MESSAGE */}
          {searchQuery && (
            <div className="mb-6 animate-fade-in">
              <p className="text-sm text-slate-500 font-medium">
                Found <span className="text-accent font-bold">{filteredItems.length}</span> items for "{searchQuery}"
              </p>
            </div>
          )}

          {/* MENU CONTENT */}
          <div className="animate-fade-in min-h-[50vh]">
            {displayCategories.length > 0 ? (
              displayCategories.map(category => (
                <MenuCategory key={category.id} category={category} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-slate-100 shadow-sm mt-8">
                <span className="text-5xl mb-4 opacity-50">🥡</span>
                <h3 className="text-lg font-bold text-slate-900 mb-1">No items found</h3>
                <p className="text-sm text-slate-500 max-w-xs">We couldn't find anything matching your search. Try a different keyword.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
