const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const checkUsername = await User.findOne({ username });

    if (checkUsername) {
      return res.json({ message: 'Username already used', status: false });
    }

    const checkEmail = await User.findOne({ email });

    if (checkEmail) {
      return res.json({
        message: 'Email already used',
        status: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    delete user.password;

    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.json({
        status: false,
        message: 'Incorrect username or password!',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({
        status: false,
        message: 'Incorrect username or password!',
      });
    }

    delete user.password;

    return res.json({
      status: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatar = req.body.image;

    const updateAvatar = await User.findByIdAndUpdate(userId, {
      avatar,
    });

    return res.json({
      isUpdate: true,
      image: updateAvatar.avatar,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const users = await User.find({ _id: { $ne: userId } }).select([
      '_id',
      'username',
      'email',
      'avatar',
    ]);

    return res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports.isLogged = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (user) {
      return res.json({
        isLogged: true,
      });
    } else {
      return res.json({
        isLogged: false,
      });
    }
  } catch (error) {
    next(error);
  }
};
