"use client";
import React from "react";
import MenuItem from "./MenuItem";

export default function MenuCategory({ category }) {
  if (!category.items || category.items.length === 0) {
    return null;
  }

  return (
    <section id={category.id} className="mb-14 scroll-mt-28">
      {/* Category Header */}
      <div className="flex items-center gap-4 mb-6 px-1">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight shrink-0">
          {category.name}
        </h2>
        <div className="h-[2px] bg-slate-100 w-full rounded-full" />
      </div>

      {/* 
          Grid Config (Beautiful & Compact):
          Mobile: 2 columns, gap 3 (approx 12px) for high density but enough breathing room.
          Tablet: 3 columns, gap 6 (24px).
          Desktop: 4 columns, gap 6.
      */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
        {category.items.map(item => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
