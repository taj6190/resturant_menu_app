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
        <h1 style={{ 
          margin: 0, 
          fontSize: '1.5rem', 
          color: 'var(--text-main)',
          fontFamily: 'var(--font-heading)',
          fontWeight: '800',
          letterSpacing: '1px',
          textTransform: 'uppercase'
        }}>
          Wok & Spice
        </h1>
        
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
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '0.5rem',
            color: 'var(--text-main)'
          }}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Off-canvas Mobile Menu */}
      <div className={`off-canvas-menu ${isMenuOpen ? 'open' : ''}`}>
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
          header { padding: 1rem 0 !important; }
          .header-nav { display: none !important; }
          .mobile-menu-toggle { display: block !important; }
        }

        .off-canvas-menu {
          position: fixed;
          top: 0;
          right: -280px;
          width: 280px;
          height: 100vh;
          background: #ffffff;
          box-shadow: -5px 0 15px rgba(0,0,0,0.1);
          z-index: 1100;
          transition: right 0.3s ease;
          padding: 2rem;
          display: flex;
          flex-direction: column;
        }

        .off-canvas-menu.open {
          right: 0;
        }

        .mobile-nav {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-top: 3rem;
        }

        .mobile-nav a {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 800;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--text-main);
          letter-spacing: 1px;
        }

        .menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.5);
          z-index: 1050;
        }
      `}</style>
    </header>
  );
}
