import mongoose from "mongoose";

const tradeSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      index: true
    },
    description: {
      type: String,
      required: true
    },
    conditions: [String],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    offers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Offer'
    }],
    acceptedOffer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Offer'
    }
  });
  
  tradeSchema.index({ title: 'text', description: 'text' });
  
  export const Trade = mongoose.model("Trade", tradeSchema);
  