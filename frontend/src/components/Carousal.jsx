import React, { useState } from "react";
import ItemsCarousel from "react-items-carousel";

const Carousal = ({ carousalData, handleClose }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  // const filteredData = carousalData.flat() || []
  const chevronWidth = 10;
  
  return (
    <div className="p-10 z-20 h-screen">
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={1}
        gutter={20}
        leftChevron={
          <div className="bg-white p-3 rounded-full">
            <button className="text-black text-2xl">{"<"}</button>
          </div>
        }
        rightChevron={
          <div className="bg-white p-3 rounded-full">
            <button className="text-black text-2xl">{">"}</button>
          </div>
        }
        outsideChevron
        chevronWidth={chevronWidth}
      >
        {carousalData?.length > 0 &&
          carousalData?.map((item) => {
            return (
              <div
                key={item?._id}
                className="w-full flex h-full justify-center"
              >
                <div className="w-[70%] h-[700px] shadow-2xl shadow-green-700 grid grid-cols-[40%_80%] overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={item?.image}
                  />

                  <div className="bg-gradient-to-br w-full to-gray-800 via-black from-gray-500">
                    <div className=" bg-red-500 h-[15%]"></div>
                    <div className="bg-green-500 h-[70%]"></div>
                    <div className="bg-red-500 h-[15%]"></div>
                  </div>
                </div>
              </div>
            );
          })}
      </ItemsCarousel>
    </div>
  );
};

export default Carousal;
