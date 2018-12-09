const passport = require('../config/passport');
const router = require('express').Router();
const chatController = require('../controllers/chat.controller');

router.get(
  '/chat',
  passport.authenticate('jwt'),
  chatController.getConversations
);

router.get(
  '/chat/:id',
  passport.authenticate('jwt'),
  chatController.getConversation
);

router.post(
  '/chat',
  passport.authenticate('jwt'),
  chatController.newConversation
);

router.post(
  '/chat/:id',
  passport.authenticate('jwt'),
  chatController.sendReply
);

module.exports = router;
