const { signInSchema, signUpSchema,} = require("../middlewares/auth-validator.middleware");
const { generateAccessToken } = require("../middlewares/jwt-token.middleware");
const { doHash, doHashValidation } = require("../utils/hashing.util");
const User = require("../models/user.model");

const signUp = async (req, res) => {
  const { email, username, password } = req.body;

  const { error } = signUpSchema.validate({ email, username, password });

  if (error) {
    return res.status(400).json({ 
      status: false, 
      message: error.details[0].message });
  }

  const emailExists = await User.findOne({ email });
  if (emailExists) 
    return res.status(409).json({ 
    status: false, 
    message: "Email already exists" 
  });

  const usernameExists = await User.findOne({ username });
  if (usernameExists) 
    return res.status(409).json({ 
    status: false, 
    message: "Username already exists" 
  });

  const hashedPassword = await doHash(password, 10);
  
  const newUser = new User({ username, email, password: hashedPassword });
  
  await newUser.save();

  res.status(201).json({ 
    status: true, 
    message: "User registered successfully" 
  });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const { error } = signInSchema.validate({ email, password });
  if (error) {
    return res.status(400).json({ 
      status: false, 
      message: error.details[0].message 
    });
  }

  const user = await User.findOne({ email });
  if (!user) 
    return res.status(401).json({ 
    status: false, 
    message: "Invalid credentials" 
  });

  const validPassword = await doHashValidation(password, user.password);
  if (!validPassword) 
    return res.status(401).json({ 
    status: false, 
    message: "Invalid credentials" 
  });

  const token = generateAccessToken(user._id);
  res.status(200).json({ status: true, token, message: "Login successful" });
};

module.exports = { signUp, signIn };
