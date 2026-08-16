import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import BreadcrumbCollapsed from "../components/Breadcrupm";
import Paginationpage from "../components/pagination";

const star = [
  <FaStar key={1} />,
  <FaStar key={2} />,
  <FaStar key={3} />,
  <FaStar key={4} />,
  <FaStar key={5} />,
];

const DEFAULT_CASUAL_PRODUCTS = [
  {
    _id: "c-1",
    name: "Gradient Graphic T-shirt",
    price: 145,
    discountPercent: 0,
    category: "tshirt",
    colors: ["Red", "Blue", "Yellow"],
    sizes: ["S", "M", "L"],
    image: "/images/arrival-img.png",
  },
  {
    _id: "c-2",
    name: "Polo with Tipping Details",
    price: 180,
    discountPercent: 0,
    category: "tshirt",
    colors: ["Green", "Blue"],
    sizes: ["M", "L", "XL"],
    image: "/images/arrival-img1.png",
  },
  {
    _id: "c-3",
    name: "Black Striped T-shirt",
    price: 120,
    discountPercent: 30,
    category: "tshirt",
    colors: ["Black", "Orange"],
    sizes: ["S", "M", "L", "XXL"],
    image: "/images/arrival-img4.png",
  },
  {
    _id: "c-4",
    name: "Skinny Fit Jeans",
    price: 240,
    discountPercent: 20,
    category: "jeans",
    colors: ["Blue"],
    sizes: ["M", "L", "XL"],
    image: "/images/arrival-img2.png",
  },
  {
    _id: "c-5",
    name: "Checkered Shirt",
    price: 180,
    discountPercent: 0,
    category: "shirt",
    colors: ["Red", "Blue"],
    sizes: ["M", "L"],
    image: "/images/arrival-img3.png",
  },
  {
    _id: "c-6",
    name: "Sleeve Striped T-shirt",
    price: 130,
    discountPercent: 30,
    category: "tshirt",
    colors: ["Orange"],
    sizes: ["S", "M", "L"],
    image: "/images/might4.png",
  },
  {
    _id: "c-7",
    name: "Vertical Striped Shirt",
    price: 212,
    discountPercent: 20,
    category: "shirt",
    colors: ["Green"],
    sizes: ["M", "L", "XL"],
    image: "/images/sell1.png",
  },
  {
    _id: "c-8",
    name: "Courage Graphic T-shirt",
    price: 145,
    discountPercent: 0,
    category: "tshirt",
    colors: ["Orange"],
    sizes: ["S", "M", "L", "XL"],
    image: "/images/sell2.png",
  },
  {
    _id: "c-9",
    name: "Loose Fit Bermuda Shorts",
    price: 80,
    discountPercent: 0,
    category: "short",
    colors: ["Blue"],
    sizes: ["S", "M", "L"],
    image: "/images/sell3.png",
  },
];

export default function CasualPage({
  products = [],
  onSelectProduct,
  onNavigate,
}) {
  const allProducts = products.length > 0 ? products : DEFAULT_CASUAL_PRODUCTS;

  const [filters, setFilters] = useState({
    category: "",
    priceRange: [50, 250],
    colors: [],
    sizes: [],
  });

  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  useEffect(() => {
    let list = allProducts;

    if (filters.category) {
      list = list.filter(
        (p) =>
          p.category?.toLowerCase() === filters.category.toLowerCase() ||
          p.name?.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    list = list.filter(
      (p) =>
        Number(p.price) >= filters.priceRange[0] &&
        Number(p.price) <= filters.priceRange[1]
    );

    if (filters.colors.length > 0) {
      list = list.filter((p) =>
        p.colors?.some((c) => filters.colors.includes(c))
      );
    }

    if (filters.sizes.length > 0) {
      list = list.filter((p) =>
        p.sizes?.some((s) => filters.sizes.includes(s))
      );
    }

    setFilteredProducts(list);
  }, [filters, allProducts]);

  const handleFilterChange = (type, value) => {
    if (type === "colors" || type === "sizes") {
      setFilters((prev) => ({
        ...prev,
        [type]: prev[type].includes(value)
          ? prev[type].filter((item) => item !== value)
          : [...prev[type], value],
      }));
    } else if (type === "priceRange") {
      setFilters((prev) => ({
        ...prev,
        priceRange: value,
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [type]: prev[type] === value ? "" : value,
      }));
    }
  };

  return (
    <div className="mt-24 md:mt-28 lg:mt-32 max-w-screen-2xl mx-auto px-4">
      <BreadcrumbCollapsed current="Casual" onNavigate={onNavigate} />

      <div className="flex flex-col md:flex-row justify-center items-start gap-6 mt-4">
        {/* Sidebar Filters */}
        <div className="w-full md:w-1/3 lg:w-1/4 bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-extrabold text-xl text-black">Filters</h3>
            <button
              onClick={() =>
                setFilters({
                  category: "",
                  priceRange: [50, 250],
                  colors: [],
                  sizes: [],
                })
              }
              className="text-xs text-red-500 font-bold hover:underline"
            >
              Reset
            </button>
          </div>

          {/* Categories */}
          <div className="mb-6 border-b border-gray-100 pb-5">
            <h4 className="font-bold text-sm mb-3">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {["tshirt", "short", "jeans", "hoodie", "shirt"].map((cat) => (
                <li
                  key={cat}
                  className={`cursor-pointer capitalize py-1 px-2 rounded-md transition-colors ${
                    filters.category === cat
                      ? "bg-black text-white font-bold"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleFilterChange("category", cat)}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range */}
          <div className="mb-6 border-b border-gray-100 pb-5">
            <h4 className="font-bold text-sm mb-3">Price</h4>
            <div className="space-y-2">
              <input
                type="range"
                className="w-full accent-black cursor-pointer"
                min="50"
                max="250"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  handleFilterChange("priceRange", [
                    filters.priceRange[0],
                    parseInt(e.target.value, 10),
                  ])
                }
              />
              <div className="flex justify-between text-xs font-semibold text-gray-600">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Colors */}
          <div className="mb-6 border-b border-gray-100 pb-5">
            <h4 className="font-bold text-sm mb-3">Colors</h4>
            <div className="flex flex-wrap gap-2">
              {[
                { name: "Red", bg: "#EF4444" },
                { name: "Green", bg: "#10B981" },
                { name: "Blue", bg: "#3B82F6" },
                { name: "Orange", bg: "#F97316" },
                { name: "Yellow", bg: "#EAB308" },
                { name: "Purple", bg: "#A855F7" },
              ].map((c) => (
                <div
                  key={c.name}
                  style={{ backgroundColor: c.bg }}
                  className={`w-8 h-8 rounded-full cursor-pointer transition-transform flex items-center justify-center ${
                    filters.colors.includes(c.name)
                      ? "ring-2 ring-offset-2 ring-black scale-110"
                      : "hover:scale-105"
                  }`}
                  onClick={() => handleFilterChange("colors", c.name)}
                >
                  {filters.colors.includes(c.name) && (
                    <span className="text-white text-xs font-bold">✓</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mb-4">
            <h4 className="font-bold text-sm mb-3">Sizes</h4>
            <div className="flex flex-wrap gap-2">
              {["S", "M", "L", "XL", "XXL"].map((sz) => (
                <button
                  key={sz}
                  className={`border px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    filters.sizes.includes(sz)
                      ? "bg-black text-white border-black"
                      : "bg-gray-50 hover:bg-gray-100 border-gray-200"
                  }`}
                  onClick={() => handleFilterChange("sizes", sz)}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="w-full md:w-2/3 lg:w-3/4">
          <div className="flex justify-between items-center mb-6 pl-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold">Casual</h2>
            <span className="text-xs sm:text-sm font-semibold text-gray-500 flex items-center gap-1">
              Showing {filteredProducts.length} Products
              <span className="ml-2 hidden sm:inline-flex items-center text-black font-bold">
                Most Popular <RiArrowDropDownLine className="text-xl" />
              </span>
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl">
              <p className="text-gray-500 font-semibold">
                No products match the selected filters.
              </p>
              <button
                onClick={() =>
                  setFilters({
                    category: "",
                    priceRange: [50, 250],
                    colors: [],
                    sizes: [],
                  })
                }
                className="mt-4 bg-black text-white text-xs px-4 py-2 rounded-full font-medium"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((data, index) => (
                <div
                  key={data._id || data.id || index}
                  onClick={() => onSelectProduct && onSelectProduct(data)}
                  className="cursor-pointer group"
                >
                  <div className="w-full h-[180px] sm:h-[240px] md:h-[290px] bg-[#F0EEED] rounded-[20px] overflow-hidden flex items-center justify-center p-4">
                    <img
                      src={
                        data.image ||
                        `/images/might${(index % 4) + 1}.png`
                      }
                      alt={data.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 rounded-[20px]"
                      onError={(e) => {
                        e.target.src = `/images/might${(index % 4) + 1}.png`;
                      }}
                    />
                  </div>
                  <div className="pt-3">
                    <p className="text-sm sm:text-base font-bold truncate">
                      {data.name}
                    </p>
                    <div className="flex text-yellow-400 text-xs sm:text-sm mt-1">
                      {star.map((icon, idx) => (
                        <span key={idx}>{icon}</span>
                      ))}
                    </div>
                    <p className="font-bold mt-1 text-sm sm:text-base flex items-center gap-2">
                      ${data.price}
                      {data.discountPercent > 0 && (
                        <span className="text-gray-400 font-normal line-through text-xs">
                          ${Math.round(data.price * 1.3)}
                        </span>
                      )}
                      {data.discountPercent > 0 && (
                        <span className="bg-red-100 text-red-600 text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-semibold">
                          -{data.discountPercent}%
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Paginationpage />
        </div>
      </div>
    </div>
  );
}
