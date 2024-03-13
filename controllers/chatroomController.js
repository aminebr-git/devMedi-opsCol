const mongoose = require("mongoose");
const Chatroom = require('../models/chatroom');
const User = require('../models/User');
const Message = require('../models/Message');

exports.createChatroom = async (req, res) => {
  const { name, code } = req.body;

  const nameRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(name)) throw "Chatroom name can contain only alphabets.";

  const chatroomExists = await Chatroom.findOne({ name });

  if (chatroomExists) throw "Chatroom with that name already exists!";

  const chatroom = new Chatroom({
    name,code,
  });

  await chatroom.save();

  res.json({
    message: "Chatroom created!",
  });
};

exports.getAllChatrooms = async (req, res) => {
  const chatrooms = await Chatroom.find({});

  res.json(chatrooms);
};

exports.getUsersInChatroom = async (chatroomId) => {
  try {
      // Find all unique user IDs in messages for the given chatroom
      const messages = await Message.find({ chatroom: chatroomId }).distinct('user');
      // Fetch user details for each unique user ID found in messages
      const users = await User.find({ '_id': { $in: messages } });
      return users; // Return the list of users
  } catch (error) {
      throw new Error(error.message);
  }
};

exports.deleteChatroom = async (req, res) => {
  try {
    const { id } = req.params; // Obtenez l'ID de la chatroom à partir de l'URL
    const deletedChatroom = await Chatroom.findByIdAndDelete(id);

    if (!deletedChatroom) {
      return res.status(404).json({ message: "Chatroom non trouvée." });
    }

    res.json({ message: "Chatroom supprimée avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de la chatroom.", error: error });
  }
};

exports.updatechat = async (req, res) => {
  const updatechat = await Chatroom.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatechat);
};
