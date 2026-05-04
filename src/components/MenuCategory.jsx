import React from "react";
import MenuItem from "./MenuItem";

export default function MenuCategory({ category }) {
  if (!category.items || category.items.length === 0) {
    return null;
  }

  return (
    <section className="category-section" id={category.id}>
      <h2>{category.name}</h2>
      <div className="items-grid">
        {category.items.map(item => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
