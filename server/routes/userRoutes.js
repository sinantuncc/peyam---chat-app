const express = require('express');
const {
  register,
  login,
  setAvatar,
  getAllUsers,
  isLogged,
} = require('../controller/userController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/:id', isLogged);
router.post('/setAvatar/:id', setAvatar);
router.get('/allUsers/:id', getAllUsers);
module.exports = router;
