import { Box, Modal } from "@mui/material";
import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";

const ShareModal = ({ shareOpen, handleShareClose, style }) => {
  const shareUrl = "https://youtu.be/cdWCHuSWKWo?si=-JZyNE203nJ2fkMz";
  const title = "Check out this awesome content!";
  const data = [
    {
      button: (
        <FacebookShareButton url={shareUrl} quote={title}>
          <FacebookIcon className="rounded-md"/>
        </FacebookShareButton>
      ),
    },
    {
      button: (
        <TwitterShareButton url={shareUrl} quote={title}>
          <TwitterIcon className="rounded-md"/>
        </TwitterShareButton>
      ),
    },
    {
      button: (
        <WhatsappShareButton url={shareUrl} quote={title}>
          <WhatsappIcon className="rounded-md"/>
        </WhatsappShareButton>
      ),
    },
    {
      button: (
        <LinkedinShareButton url={shareUrl} quote={title}>
          <LinkedinIcon className="rounded-md" />
        </LinkedinShareButton>
      ),
    },
  ];
  return (
    <Modal
      open={shareOpen}
      onClose={handleShareClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="flex flex-wrap gap-6">
        {data.map(({ button }, index) => <div key={index}>{button}</div>)}
      </Box>
    </Modal>
  );
};

export default ShareModal;
