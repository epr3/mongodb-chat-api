const Conversation = require('../models/conversation');

const getConversations = async () => {
  try {
    return await Conversation.find().exec();
  } catch (e) {
    throw new Error(e.message);
  }
};

const createConversation = async data => {
  try {
    const conversation = new Conversation({
      participants: [data.userId, data.recipientId]
    });
    return await conversation.save();
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  getConversations,
  createConversation
};
