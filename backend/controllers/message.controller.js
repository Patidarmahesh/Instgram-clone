import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReciverSocketId, io } from "../socket/socket.js";

export const createMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const reciverId = req.params.id;
    const { textMessage: message } = req.body;
    if (!message) {
      return res.status(401).json({
        success: false,
        message: "message is required!!",
      });
    }
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, reciverId] },
    });
    // // start is Conversation
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, reciverId],
      });
    }
    const newmessage = await Message.create({
      senderId,
      reciverId,
      message: message,
    });

    if (newmessage) await conversation?.messages.push(newmessage._id);
    await Promise.all([conversation.save(), newmessage.save()]);

    // // implement for socket io chating
    const reciverSocketId = getReciverSocketId(reciverId);
    if (reciverSocketId) {
      io.to(reciverSocketId).emit("newmessage", newmessage);
    }
    return res.status(200).json({
      message: "create new message",
      success: true,
      newmessage,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const reciverId = req.params.id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, reciverId] },
    }).populate("messages");
    if (!conversation) {
      return res.status(200).json({
        success: true,
        messages: [],
      });
    }
    return res.status(200).json({
      success: true,
      messages: conversation?.messages,
    });
  } catch (error) {
    console.log(error);
  }
};
