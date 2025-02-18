import { User } from "../models/user.js";
import {Trade} from "../models/trade.js"
import {Offer} from "../models/offers.js"

import jwt from 'jsonwebtoken';


export const signUp = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists. Please use a different username." });
    }

    const user = await User.create({ name, username, password});

    return res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials. Please try again." });
    }

    // Generate a token
    const token = jwt.sign(
      { userId: user._id }, // Payload
      process.env.JWT_SECRET, // Secret
      { expiresIn: '24h' } // Token Expiry
    );

    return res.status(200).json({ user, token }); // Send the token in the response
  } catch (error) {
    console.log("Failed to login:", error.message);
    return res.status(500).json({ error: error.message });
  }
};



export const changePassword = async (req, res) => {
  const { username, currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: "Both current and new passwords are required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.password !== currentPassword) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({ message: "Password successfully updated" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details", error });
  }
};

export const getUserTrades = async (req, res) => {
  try {
    const trades = await Trade.find({ creator: req.user._id });
    res.json(trades);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trades", error });
  }
};

export const getUserOffers = async (req, res) => {
  try {
    const offers = await Offer.find({ user: req.user._id });
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching offers", error });
  }
};




