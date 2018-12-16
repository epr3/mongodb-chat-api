const Conversation = require('../models/conversation');

const getConversations = async data => {
  try {
    return await Conversation.find({
      participants: { $elemMatch: { $eq: data.userId } }
    })
      .populate('participants')
      .exec();
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
