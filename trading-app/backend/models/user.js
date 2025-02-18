import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  numberOfItemsOwned: {
    type: Number,
    default: 0
  },
  trades: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trade'
  }]
});


export const User = mongoose.model("User", userSchema);
