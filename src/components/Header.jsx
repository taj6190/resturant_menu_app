"use client";
import React, { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Menu", href: "#menu" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled
          ? "bg-white/80 backdrop-blur-xl border-slate-200 shadow-sm"
          : "bg-white/50 backdrop-blur-md border-transparent"
          }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 xl:px-0 h-16 flex items-center justify-between">

          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center shadow-sm">
              <img src="/icon.png" className="w-5 h-5 invert" />
            </div>
            <span className="font-bold text-slate-900 tracking-tight">
              Wok & Spice
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-black transition"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-semibold rounded-full bg-black text-white hover:opacity-90 transition">
              Phone No - 01625456190
            </button>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm active:scale-95"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Overlay */}
      <div
        onClick={() => setIsMenuOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      />

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-50 shadow-2xl transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between p-5 border-b">
          <span className="font-semibold">Menu</span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="w-9 h-9 rounded-full border flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        <nav className="p-5 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-semibold text-slate-700 hover:text-black"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-5 border-t">
          <button className="w-full py-3 rounded-xl bg-black text-white font-semibold">
            Phone No - 01625456190
          </button>
        </div>
      </aside>
    </>
  );
}