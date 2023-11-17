const express = require('express');
const {
  addMessage,
  getAllMessages,
} = require('../controller/messageController');

const router = express.Router();

router.post('/addMessage', addMessage);
router.post('/getAllMessages', getAllMessages);

module.exports = router;
