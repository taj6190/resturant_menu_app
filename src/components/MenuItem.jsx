"use client";
import React from "react";

export default function MenuItem({ item }) {
  // Generate a clean string of chili emojis for spice
  const spiceIcons = item.spicy_level > 0 ? "🌶️".repeat(item.spicy_level) : null;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-elegant hover:shadow-elegant-hover transition-all duration-300 flex flex-col h-full border border-slate-100/50">
      
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy" 
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = `https://placehold.co/400x300/f8fafc/cbd5e1?text=${encodeURIComponent(item.name)}`;
          }}
        />
        
        {/* Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {item.original_price && (
            <span className="bg-white/95 backdrop-blur-sm text-green-600 shadow-sm text-[10px] font-extrabold px-2 py-1 rounded-lg uppercase tracking-wide">
              Sale
            </span>
          )}
          {item.is_popular && (
            <span className="bg-accent text-white shadow-sm text-[10px] font-extrabold px-2 py-1 rounded-lg uppercase tracking-wide">
              Popular
            </span>
          )}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-3.5 md:p-5 flex flex-col flex-grow">
        
        {/* Header: Name & Price */}
        <div className="flex justify-between items-start gap-3 mb-1.5">
          <h3 className="text-[13px] md:text-base font-bold text-slate-900 leading-tight line-clamp-2">
            {item.name}
          </h3>
          <div className="flex flex-col items-end shrink-0">
            {item.original_price && (
              <span className="text-[10px] text-slate-400 line-through font-medium">
                {item.original_price}
              </span>
            )}
            <span className="text-[14px] md:text-lg font-extrabold text-accent">
              {item.price}
            </span>
          </div>
        </div>
        
        {/* Description: Hidden on small mobile to keep cards compact, visible on tablets+ */}
        <p className="hidden md:block text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">
          {item.description}
        </p>
        
        {/* Spacer to push tags to bottom on mobile where desc is hidden */}
        <div className="flex-grow" />

        {/* Footer: Tags & Spice */}
        <div className="mt-3 pt-3 border-t border-slate-50 flex justify-between items-center gap-2">
          <div className="flex flex-wrap gap-1.5">
            {item.dietary_tags && item.dietary_tags.slice(0, 1).map(tag => (
              <span key={tag} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">
                {tag}
              </span>
            ))}
            {item.is_halal && (
              <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">
                Halal
              </span>
            )}
          </div>
          
          {spiceIcons && (
            <div className="text-[10px] opacity-80" title={`Spicy Level: ${item.spicy_level}`}>
              {spiceIcons}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
