const Message = require('../models/message');

const getMessages = async data => {
  try {
    return await Message.find({ conversationId: data.id }).exec();
  } catch (e) {
    throw new Error(e.message);
  }
};

const createMessage = async data => {
  try {
    const message = new Message({
      conversationId: data.conversationId,
      body: data.body,
      author: data.userId
    });
    return await message.save();
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  getMessages,
  createMessage
};
