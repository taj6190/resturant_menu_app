"use client";
import React, { useState } from "react";
import menuData from "../data/menu.json";
import MenuCategory from "../components/MenuCategory";
import Header from "../components/Header";
import "./page.css";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const { categories, items } = menuData;

  // Filter all items based on the search query
  const filteredItems = items.filter(item => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    const nameMatch = item.name.toLowerCase().includes(query);
    const descMatch = item.description.toLowerCase().includes(query);
    const tagMatch = item.dietary_tags && item.dietary_tags.some(tag => tag.toLowerCase().includes(query));
    
    return nameMatch || descMatch || tagMatch;
  });

  // Group the filtered items by category
  let itemsByCategory = categories.map(category => {
    return {
      ...category,
      items: filteredItems.filter(item => item.category === category.id)
    };
  });

  // Dynamically find all discounted items from the FILTERED items list
  const discountedItems = filteredItems.filter(item => item.original_price);
  
  if (discountedItems.length > 0) {
    itemsByCategory.unshift({
      id: "super-deals",
      name: "🔥 Super Deals",
      items: discountedItems
    });
  }

  // Remove any categories that are now empty because of the search filter
  itemsByCategory = itemsByCategory.filter(category => category.items.length > 0);

  // When a search is active, we should force 'all' categories to show
  const displayCategories = searchQuery 
    ? itemsByCategory 
    : itemsByCategory.filter(cat => activeCategory === "all" || cat.id === activeCategory);

  return (
    <div className="page-wrapper animate-fade-in">
      <Header />
      
      <main>
        {/* HERO SECTION */}
        <div className="hero">
          <div className="hero-overlay"></div>
          <div className="container hero-content">
            <h1>Authentic Chinese,<br/>Deshi Style.</h1>
            <p>Experience the perfect fusion of rich spices and classic wok-tossed flavors. Served fresh, hot, and full of flavor.</p>
            <a href="#menu" className="btn-primary">View Menu</a>
          </div>
        </div>

        {/* ABOUT US SECTION */}
        <section id="about" className="about-section container">
          <div className="about-grid">
            <div className="about-content">
              <h2>Our Story</h2>
              <p className="lead-text">Where traditional Chinese techniques meet bold Dhaka flavors.</p>
              <p>
                Welcome to Wok & Spice. For over 10 years, we have been serving the finest Bangladeshi-style Chinese cuisine. 
                Our chefs masterfully blend traditional wok-tossed cooking with the rich, aromatic spices loved in our culture. 
              </p>
              <p>
                Whether you are craving our signature sizzling chicken, perfectly tossed mixed fried rice, or a comforting bowl of thick Thai soup, 
                every single dish is prepared fresh to order using the highest quality ingredients.
              </p>
            </div>
            <div className="about-image">
              <img src="https://loremflickr.com/800/800/chef,cooking" alt="Chef tossing a wok" loading="lazy" />
            </div>
          </div>
        </section>

        {/* MENU SECTION */}
        <section id="menu" className="menu-container container">
          <div className="menu-header">
            <h2>Our Menu</h2>
            
            {/* INSTANT SEARCH BAR */}
            <div className="search-bar-wrapper">
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search for 'Prawn', 'Spicy', 'Noodles'..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <p className="search-results-text">
                  Found {filteredItems.length} dish{filteredItems.length !== 1 ? 'es' : ''} matching "{searchQuery}"
                </p>
              )}
            </div>

            {/* STICKY CATEGORY NAV TABS */}
            {!searchQuery && itemsByCategory.length > 0 && (
              <div className="sticky-category-nav">
                <button 
                  className={`cat-nav-btn ${activeCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveCategory('all')}
                >
                  All
                </button>
                {itemsByCategory.map(cat => (
                  <button 
                    key={cat.id} 
                    className={`cat-nav-btn ${activeCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    {cat.name.replace('🔥 ', '')}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="menu-categories">
            {displayCategories.length > 0 ? (
              displayCategories.map(category => (
                <MenuCategory key={category.id} category={category} />
              ))
            ) : (
              <div className="no-results">
                <h3>No dishes found.</h3>
                <p>Try searching for something else like "Chicken", "Rice", or "Mild".</p>
                <button className="btn-primary" onClick={() => setSearchQuery("")} style={{ marginTop: '1rem' }}>Clear Search</button>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>© {new Date().getFullYear()} Wok & Spice Restaurant. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
