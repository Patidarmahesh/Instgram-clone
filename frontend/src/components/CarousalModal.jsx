import React from "react";
import Modal from "@mui/material/Modal";
import Carousal from "./Carousal";

const CarousalModal = ({ carousalData, open, handleClose,handleOpen }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Carousal handleClose={handleClose} carousalData={carousalData} handleOpen={handleOpen} />
    </Modal>
  );
};

export default CarousalModal;
