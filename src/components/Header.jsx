"use client";
import React, { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "About Us", href: "#about" },
    { name: "Menu", href: "#menu" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/90 backdrop-blur-md shadow-glass py-3 border-b border-slate-100" 
        : "bg-white/80 backdrop-blur-sm py-5 border-transparent"
    }`}>
      <div className="container flex justify-between items-center">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-sm">
            <img src="/icon.png" alt="Logo" className="w-6 h-6 object-contain invert" />
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Wok & Spice
          </h1>
        </a>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 bg-slate-50 px-6 py-2.5 rounded-full border border-slate-100">
          {navLinks.map(link => (
            <a 
              key={link.name}
              href={link.href} 
              className="text-sm font-semibold text-slate-600 hover:text-accent transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden w-11 h-11 flex items-center justify-center bg-slate-50 rounded-xl text-slate-900 border border-slate-100 shadow-sm active:scale-95 transition-all"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Off-canvas Mobile Menu */}
      <div className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl z-[2000] flex flex-col transition-transform duration-400 ease-out transform ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">Navigation</h2>
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-full text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav className="flex flex-col p-6 gap-2 overflow-y-auto">
          {navLinks.map(link => (
            <a 
              key={link.name}
              href={link.href} 
              onClick={() => setIsMenuOpen(false)}
              className="text-xl font-bold text-slate-700 hover:text-accent p-4 hover:bg-slate-50 rounded-2xl transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[1500] transition-opacity"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
}
