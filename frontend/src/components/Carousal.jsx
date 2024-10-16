import React, { useState } from "react";
import ItemsCarousel from "react-items-carousel";
import { useSelector } from "react-redux";
import CommentCommanData from "./CommentCommanData";
import ShareModal from "./ShareModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  p: 4,
  backgroundColor: "gray",
};

const Carousal = ({ carousalData,handleOpen,handleClose }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  // const filteredData = carousalData.flat() || []
  const chevronWidth = 10;
  const [shareOpen, setShareOpen] = React.useState(false);
  const handleShareOpen = () => setShareOpen(true);
  const handleShareClose = () => setShareOpen(false);

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
                <div className="w-[70%] h-[700px] shadow-2xl shadow-green-700 grid grid-cols-[40%_60%]">
                  <img
                    className="h-full w-full object-fill"
                    src={item?.image}
                  />

                  {/* <div className="bg-gradient-to-br w-full to-gray-800 via-black from-gray-500"> */}
                  <CommentCommanData
                    className="h-[700px] w-full"
                    item={item}
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                    handleShareOpen={handleShareOpen}
                  />
                  {/* </div> */}
                </div>
              </div>
            );
          })}
      </ItemsCarousel>
      <ShareModal
        style={style}
        shareOpen={shareOpen}
        handleShareClose={handleShareClose}
      />
    </div>
  );
};

export default Carousal;
