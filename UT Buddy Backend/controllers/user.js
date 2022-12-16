const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Stripes = require("../models/stripe");
const Prices = require("../models/prices");
const User = require("../models/user.js");

const user = {};

user.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

user.signup = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    re_password,
    address,
    zip,
    occupation,
    gender,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (password !== re_password) {
      return res.status(400).json({ message: "Passwords are not the same" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      address,
      zip,
      occupation,
      gender,
      dashboard: false,
      bills: false,
      community: false,
      live: false,
      profile: false,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    const data = await Prices.find();
    var prices = [];
    var priceid = data[0].priceId[0];
    var links = data[0].priceLink[0];
    var keys = Object.keys(priceid);
    for (key of keys) {
      var num = Math.floor(Math.random() * 4);
      prices.push({ price: priceid[key][num], link: links[key][num] });
    }

    const results = await Stripes.create({ userId: result._id, prices });
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = user;
