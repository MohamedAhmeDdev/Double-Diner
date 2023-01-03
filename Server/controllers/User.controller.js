const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../constants");

const User = require("../models/User.model");

const createToken = (id, name, email) => {
  return JWT.sign(
    {
      id: id,
      name: name,
      email: email,
    },
    JWT_SECRET,
    { expiresIn: "3d" }
  );
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Username or password is missing",
    });
  }

  // find email and password in database
  const foundUser = await User.findOne({ where: { email: email } });

  // if the email  does not exist
  if (!foundUser) {
    return res.status(401).json({
      success: false,
      message: "Invalid login credentials",
    });
  }

  // compare password
  const dbPassword = foundUser.password;

  bcrypt.compare(password, dbPassword).then((match) => {
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid login credentials",
      });
    } else {
      const token = createToken(foundUser.id, foundUser.name, foundUser.email);

      return res.status(200).json({
        success: true,
        user: {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          token: token,
          role: foundUser.role,
        },
      });
    }
  });
};

//signup
const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const regEx = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;

  const encryptPassword = await bcrypt.hash(password, 10);

  //TODO: - This should be done in the frontend
  if (
    name.length === 0 ||
    email.length === 0 ||
    password.length < 4 ||
    !regEx.test(email)
  ) {
    return res.sendStatus(400).json({
      success: false,
      message: "Invalid registration credentials",
    });
  }

  const checkingIfEmailExists = await User.findOne({ where: { email: email } }); // find email in database

  if (checkingIfEmailExists) {
    // if the email much send 401
    return res.status(401).json({
      success: false,
      message: "Email already exists",
    });
  } else {
    try {
      const user = await User.create({
        name: name,
        email: email,
        password: encryptPassword,
      });

      const token = createToken(user.id, user.name, user.email);
      return res.status(200).json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          token: token,
          role: user.role,
        },
      });
    } catch (error) {
      return res.json({ message: error.message });
    }
  }
};

// for changing role - admin
const updateRole = async (req, res) => {
  const { id, role } = req.body;

  if (!id || !role) {
    return res.status(400).json({
      success: false,
      message: "Id or role is missing",
    });
  }

  try {
    const user = await User.findOne({ where: { id: id } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const updatedUser = await User.update({ role }, { where: { id: id } });

    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// for changing username or password
const updateDetails = async (req, res) => {
  const { id, name, email, password } = req.body;

  if (!id || !name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Id or name or email or password is missing",
    });
  }

  try {
    const user = await User.findOne({ where: { id: id } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const updatedUser = await User.update(
      { name, email },
      { where: { id: id } }
    );

    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Get all users - admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      success: true,
      users: users,
    });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

// get user by id - admin
const getUserById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Id is missing",
    });
  }

  try {
    const user = await User.findOne({ where: { id: id } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        user,
      });
    }
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
};

// delete user by id - admin
const deleteUserById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Id is missing",
    });
  }

  try {
    const user = await User.findOne({ where: { id: id } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      await User.destroy({ where: { id: id } });

      return res.status(200).json({
        success: true,
        user: {
          id: user.id,
        },
      });
    }
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
};

module.exports = {
  login,
  signup,
  updateRole,
  updateDetails,
  getAllUsers,
  getUserById,
  deleteUserById,
};
