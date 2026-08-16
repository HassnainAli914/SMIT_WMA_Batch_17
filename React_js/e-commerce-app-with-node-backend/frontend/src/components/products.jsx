import React from "react";
import { FaStar } from "react-icons/fa";
import { Button } from "./ui/button";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

const star = [
  <FaStar key={1} />,
  <FaStar key={2} />,
  <FaStar key={3} />,
  <FaStar key={4} />,
  <FaStar key={5} />,
];

const DEFAULT_ARRIVALS = [
  {
    _id: "arr-1",
    name: "T-SHIRT WITH TAPE DETAILS",
    price: 120,
    discountPercent: 0,
    image: "/images/arrival-img1.png",
  },
  {
    _id: "arr-2",
    name: "SKINNY FIT JEANS",
    price: 240,
    discountPercent: 20,
    image: "/images/arrival-img2.png",
  },
  {
    _id: "arr-3",
    name: "CHECKERED SHIRT",
    price: 180,
    discountPercent: 0,
    image: "/images/arrival-img3.png",
  },
  {
    _id: "arr-4",
    name: "SLEEVE STRIPED T-SHIRT",
    price: 130,
    discountPercent: 30,
    image: "/images/arrival-img4.png",
  },
];

export default function Product({
  products = [],
  onSelectProduct,
  onNavigate,
}) {
  const displayList = products.length > 0 ? products : DEFAULT_ARRIVALS;

  return (
    <div className="w-full h-full mt-12 lg:mt-24 max-w-screen-xl mx-auto px-4">
      <h1 className="text-3xl md:text-5xl font-extrabold text-center tracking-tight">
        NEW ARRIVALS
      </h1>
      <Carousel className="w-full mt-10">
        <CarouselContent className="flex gap-4 lg:gap-6">
          {displayList.map((data, index) => (
            <CarouselItem
              key={data._id || data.id || index}
              className="basis-1/2 sm:basis-1/3 lg:basis-1/4"
            >
              <div
                onClick={() => onSelectProduct && onSelectProduct(data)}
                className="cursor-pointer group"
              >
                <div className="w-full h-[190px] sm:h-[240px] md:h-[290px] bg-[#F0EEED] rounded-[20px] overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={data.image || `/images/might${(index % 4) + 1}.png`}
                    alt={data.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 rounded-[20px]"
                    onError={(e) => {
                      e.target.src = `/images/might${(index % 4) + 1}.png`;
                    }}
                  />
                </div>
                <div className="pl-1 pt-3">
                  <p className="text-base sm:text-lg font-bold truncate">
                    {data.name}
                  </p>
                  <div className="flex text-yellow-400 text-sm mt-1">
                    {star.map((icon, idx) => (
                      <span key={idx}>{icon}</span>
                    ))}
                    <span className="text-xs text-gray-500 ml-1.5 mt-0.5">
                      4.5/5
                    </span>
                  </div>
                  <p className="font-bold mt-1 text-base sm:text-lg flex items-center gap-2">
                    ${data.price}
                    {data.discountPercent > 0 && (
                      <span className="text-gray-400 font-normal line-through text-sm">
                        ${Math.round(data.price * 1.3)}
                      </span>
                    )}
                    {data.discountPercent > 0 && (
                      <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full font-semibold">
                        -{data.discountPercent}%
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-center items-center mt-8">
        <Button
          onClick={() => onNavigate && onNavigate("casual")}
          variant="outline"
          className="w-full sm:w-[220px] rounded-full py-6 text-sm font-medium border-gray-300 hover:bg-black hover:text-white transition"
        >
          View All
        </Button>
      </div>
    </div>
  );
}
