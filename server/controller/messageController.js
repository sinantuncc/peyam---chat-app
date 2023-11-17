const Message = require('../models/messageModel');
const bcrypt = require('bcrypt');

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;

    // const salt = '$2a$10$' + from.toString() + to.toString() + message.length;

    // const hashedMessage = await bcrypt.hash(message, salt);

    // const result = await Message.create({
    //   message: {
    //     text: hashedMessage,
    //   },
    //   users: [from, to],
    //   sender: from,
    // });

    const result = await Message.create({
      message: {
        text: message,
      },
      users: [from, to],
      sender: from,
    });

    //delete result.message;

    if (result)
      return res.json({
        msg: 'Message added successfully',
        result,
      });

    return res.json({
      msg: 'Failed to add message to the database',
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Message.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });

    return res.json(projectMessages);
  } catch (error) {
    next(error);
  }
};
