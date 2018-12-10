const messageService = require('../services/message.service');
const conversationService = require('../services/conversation.service');

const getConversations = async (req, res) => {
  try {
    const conversations = await conversationService.getConversations({
      userId: req.user._id
    });
    res.status(200).send(conversations);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const getConversation = async (req, res) => {
  try {
    const messages = await messageService.getMessages({ id: req.params.id });
    res.status(200).send(messages);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const newConversation = async (req, res) => {
  try {
    const conversation = await conversationService.createConversation({
      userId: req.user._id,
      recipientId: req.body.recipientId
    });
    const message = await messageService.createMessage({
      conversationId: conversation._id,
      body: req.body.body,
      author: req.user._id
    });
    res.status(200).send(message);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

const sendReply = async (req, res) => {
  try {
    const message = await messageService.createMessage({
      conversationId: req.params.id,
      body: req.body.body,
      author: req.user.id
    });
    res.status(200).send(message);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

module.exports = {
  getConversations,
  getConversation,
  newConversation,
  sendReply
};
