import { useState } from "react";

const categories = [
  "All",
  "Men's clothing",
  "Women's clothing",
  "Electronics",
  "Jewelery",
];

const Category = ({ selected, onSelect }) => {
  const [active, setActive] = useState(selected || "");

  const handleSelect = (cat) => {
    const selected = cat === "All" ? "" : cat;
    setActive(selected);
    onSelect && onSelect(selected);
  }

  return (
    <div className="flex flex-wrap gap-3 py-4 max-md:px-1">
      {categories.map((cat, idx) => (
        <button
          key={idx}
          onClick={() => handleSelect(cat)}
          className={`px-4 py-2 rounded-md border duration-300 ${
            active === cat
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default Category;
