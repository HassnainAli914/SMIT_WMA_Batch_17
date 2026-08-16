import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Minus, Plus } from "lucide-react";
import BreadcrumbCollapsed from "../components/Breadcrupm";
import CustomerTestimonials from "../components/AllReviews";
import Top_sell from "../components/Top_sell";

const star = [
  <FaStar key={1} />,
  <FaStar key={2} />,
  <FaStar key={3} />,
  <FaStar key={4} />,
  <FaStar key={5} />,
];

export default function ProductDetailPage({
  product,
  onAddToCart,
  onSelectProduct,
  onNavigate,
}) {
  const currentProduct = product || {
    _id: "default-p",
    name: "ONE LIFE GRAPHIC T-SHIRT",
    price: 260,
    discountPercent: 40,
    description:
      "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
    colors: ["#4F4631", "#314F4A", "#31354F"],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    image: "/images/arrival-img.png",
  };

  const [selectedImage, setSelectedImage] = useState(
    currentProduct.image || "/images/arrival-img.png"
  );
  const [selectedColor, setSelectedColor] = useState(
    currentProduct.colors?.[0] || "#4F4631"
  );
  const [selectedSize, setSelectedSize] = useState(
    currentProduct.sizes?.[2] || "Large"
  );
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart({
        id: currentProduct._id || currentProduct.id,
        name: currentProduct.name,
        price: currentProduct.price,
        image: selectedImage,
        color: selectedColor,
        size: selectedSize,
        qty: quantity,
        discount: currentProduct.discountPercent || 0,
      });
      setAddedToast(true);
      setTimeout(() => setAddedToast(false), 3000);
    }
  };

  const thumbs = [
    currentProduct.image || "/images/arrival-img.png",
    "/images/arrival-img1.png",
    "/images/arrival-img3.png",
  ];

  return (
    <div className="mt-24 md:mt-28 lg:mt-32 max-w-screen-2xl mx-auto px-4">
      <BreadcrumbCollapsed
        current={currentProduct.name}
        onNavigate={onNavigate}
      />

      <div className="flex h-full flex-col md:flex-row justify-center items-start gap-8 lg:gap-12 max-w-screen-xl mx-auto mt-6">
        {/* Thumbnails + Main Image */}
        <div className="w-full md:w-1/2 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-3 justify-center">
            {thumbs.map((src, i) => (
              <div
                key={i}
                onClick={() => setSelectedImage(src)}
                className={`w-[80px] sm:w-[110px] h-[80px] sm:h-[120px] bg-[#F0EEED] rounded-2xl overflow-hidden cursor-pointer border-2 transition-all p-2 flex items-center justify-center ${
                  selectedImage === src ? "border-black" : "border-transparent"
                }`}
              >
                <img
                  src={src}
                  alt="thumb"
                  className="w-full h-full object-contain rounded-xl"
                  onError={(e) => {
                    e.target.src = "/images/might1.png";
                  }}
                />
              </div>
            ))}
          </div>

          {/* Main Large Image */}
          <div className="flex-1 bg-[#F0EEED] rounded-3xl overflow-hidden h-[340px] sm:h-[420px] md:h-[480px] flex items-center justify-center p-6">
            <img
              src={selectedImage}
              alt={currentProduct.name}
              className="w-full h-full object-contain rounded-2xl"
              onError={(e) => {
                e.target.src = "/images/arrival-img.png";
              }}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight">
            {currentProduct.name}
          </h1>

          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400 text-sm">
              {star.map((icon, idx) => (
                <span key={idx}>{icon}</span>
              ))}
            </div>
            <span className="text-xs sm:text-sm font-semibold text-gray-500">
              4.5/5
            </span>
          </div>

          <div className="flex items-center space-x-3 pt-1">
            <span className="text-2xl sm:text-3xl font-extrabold">
              ${currentProduct.price * quantity}
            </span>
            {currentProduct.discountPercent > 0 && (
              <span className="text-xl sm:text-2xl font-bold text-gray-400 line-through">
                ${Math.round(currentProduct.price * 1.4) * quantity}
              </span>
            )}
            {currentProduct.discountPercent > 0 && (
              <span className="bg-red-100 text-red-600 text-xs px-2.5 py-1 rounded-full font-bold">
                -{currentProduct.discountPercent}%
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600 leading-relaxed border-b border-gray-100 pb-5">
            {currentProduct.description ||
              "This graphic t-shirt is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style."}
          </p>

          {/* Select Colors */}
          <div className="border-b border-gray-100 pb-5">
            <p className="text-xs font-semibold text-gray-500 mb-2.5">
              Select Colors
            </p>
            <div className="flex space-x-3">
              {(currentProduct.colors || ["#4F4631", "#314F4A", "#31354F"]).map(
                (color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(color)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform ${
                      selectedColor === color
                        ? "ring-2 ring-offset-2 ring-black scale-110"
                        : "hover:scale-105"
                    }`}
                    style={{ backgroundColor: color }}
                  >
                    {selectedColor === color && (
                      <span className="text-white text-xs font-bold">✓</span>
                    )}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Choose Size */}
          <div className="border-b border-gray-100 pb-5">
            <p className="text-xs font-semibold text-gray-500 mb-2.5">
              Choose Size
            </p>
            <div className="flex flex-wrap gap-2.5">
              {(currentProduct.sizes || ["Small", "Medium", "Large", "X-Large"]).map(
                (sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
                      selectedSize === sz
                        ? "bg-black text-white"
                        : "bg-[#F0F0F0] text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {sz}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center justify-between bg-[#F0F0F0] rounded-full px-5 py-3 w-[140px]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-gray-700 hover:text-black font-bold p-1"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-bold text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-gray-700 hover:text-black font-bold p-1"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAdd}
              className="flex-1 bg-black text-white py-3.5 rounded-full text-sm font-semibold hover:bg-gray-800 transition active:scale-[0.99] shadow"
            >
              Add to Cart
            </button>
          </div>

          {addedToast && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2.5 rounded-xl text-xs font-medium animate-in fade-in flex items-center justify-between">
              <span>Item added to your cart successfully!</span>
              <button
                onClick={() => onNavigate && onNavigate("cart")}
                className="underline font-bold ml-2"
              >
                View Cart
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Customer Reviews Section */}
      <CustomerTestimonials />

      {/* Recommendations */}
      <Top_sell
        title="YOU MIGHT ALSO LIKE"
        onSelectProduct={onSelectProduct}
        onNavigate={onNavigate}
      />
    </div>
  );
}
