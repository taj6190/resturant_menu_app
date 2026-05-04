"use client";
import React, { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "About Us", href: "#about" },
    { name: "Menu", href: "#menu" },
  ];

  return (
    <header style={{
      padding: '1.5rem 0',
      borderBottom: '1px solid #e2e8f0',
      background: '#ffffff',
      position: 'relative',
      zIndex: 1000
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img src="/icon.png" alt="Wok & Spice Logo" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
          <h1 style={{ 
            margin: 0, 
            fontSize: '1.25rem', 
            color: 'var(--text-main)',
            fontFamily: 'var(--font-heading)',
            fontWeight: '800',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}>
            Wok & Spice
          </h1>
        </div>
        
        {/* Desktop Nav */}
        <nav className="header-nav" style={{ display: 'flex', gap: '2rem' }}>
          {navLinks.map(link => (
            <a 
              key={link.name}
              href={link.href} 
              style={{ color: 'var(--text-muted)', fontWeight: '600', textDecoration: 'none', textTransform: 'uppercase', fontSize: '0.9rem' }}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button 
          className="mobile-menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            fontSize: '1.75rem',
            cursor: 'pointer',
            padding: '0.5rem',
            color: 'var(--text-main)'
          }}
        >
          ☰
        </button>
      </div>

      {/* Off-canvas Mobile Menu */}
      <div className={`off-canvas-menu ${isMenuOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
          <button 
            onClick={() => setIsMenuOpen(false)}
            style={{ background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer', color: 'var(--text-main)' }}
          >
            ✕
          </button>
        </div>
        
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <img src="/icon.png" alt="Logo" style={{ width: '60px', height: '60px', marginBottom: '0.5rem' }} />
          <h2 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--text-main)', textTransform: 'uppercase', fontWeight: 800 }}>Wok & Spice</h2>
        </div>

        <nav className="mobile-nav">
          {navLinks.map(link => (
            <a 
              key={link.name}
              href={link.href} 
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="menu-overlay"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <style>{`
        @media (max-width: 600px) {
          header { padding: 0.75rem 0 !important; }
          .header-nav { display: none !important; }
          .mobile-menu-toggle { display: block !important; }
        }

        .off-canvas-menu {
          position: fixed;
          top: 0;
          right: -300px;
          width: 300px;
          height: 100vh;
          background: #ffffff;
          box-shadow: -10px 0 30px rgba(0,0,0,0.15);
          z-index: 2000;
          transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 1.5rem 2rem;
          display: flex;
          flex-direction: column;
        }

        .off-canvas-menu.open {
          right: 0;
        }

        .mobile-nav {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .mobile-nav a {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--text-main);
          letter-spacing: 1px;
          padding: 0.75rem 0;
          border-bottom: 1px solid #f8f8f8;
        }

        .menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.3);
          backdrop-filter: blur(2px);
          z-index: 1500;
        }
      `}</style>
    </header>
  );
}
