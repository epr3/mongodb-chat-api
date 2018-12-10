const Message = require('../models/message');

const getMessages = async data => {
  try {
    return await Message.find({ conversationId: data.id })
      .populate('author')
      .exec();
  } catch (e) {
    throw new Error(e.message);
  }
};

const createMessage = async data => {
  try {
    const message = new Message({
      conversationId: data.conversationId,
      body: data.body,
      author: data.author
    });
    const savedMessage = await message.save();
    return await savedMessage.populate('author').execPopulate();
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  getMessages,
  createMessage
};
