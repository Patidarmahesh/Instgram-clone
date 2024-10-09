import React from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const EmojiPicker = ({ showPicker, addEmoji }) => {
  return (
    <div>
      {showPicker && (
        <Picker
          emojiButtonSize={28}
          emojiSize={20}
          data={data}
          onEmojiSelect={addEmoji}
        />
      )}
    </div>
  );
};

export default EmojiPicker;
