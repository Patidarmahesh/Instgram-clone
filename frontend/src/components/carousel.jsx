import React, { useState } from "react";

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="relative pt-8">
        <div className="w-full max-w-lg mx-auto overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {items.map((item, index) => (
              <div key={index} className="min-w-full">
                <img
                  src={item}
                  alt={`Slide ${index}`}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
          <button
            className={`${currentIndex===0?"hidden":"bg-gray-700"} absolute rounded-full md:left-[79%] left-[75%] top-0 transform -translate-y-1/2 text-white h-10 w-10`}
            onClick={currentIndex>0&&goToPrevious}
          >
            &lt;
          </button>
          <button
            className={`${currentIndex===items.length-1?"hidden":"bg-gray-700"} absolute rounded-full right-0 top-0 transform -translate-y-1/2 text-white p-2 h-10 w-10`}
            onClick={currentIndex!==items.length-1?goToNext:""}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
