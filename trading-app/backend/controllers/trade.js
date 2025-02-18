import { Trade } from "../models/trade.js";

export const createTrade = async (req, res) => {
  try {
    const { title, description, conditions } = req.body;
    const creatorId = req.user._id; // Get the creatorId from req.user set by the authentication middleware

    if (!title || !description || !conditions) {
      return res.status(400).json({ error: "All fields must be provided" });
    }

    const newTrade = new Trade({
      title,
      description,
      conditions,
      creator: creatorId, // Use the authenticated user's ID as the creator
      offers: [],
      acceptedOffer: null 
    });

    const savedTrade = await newTrade.save();
    return res.status(201).json({ trade: savedTrade });
  } catch (error) {
    console.error('Failed to create trade:', error);
    return res.status(500).json({ error: error.message });
  }
};


export async function listTrades(req, res) {
  const { search } = req.query;
  let query = {};
  if (search) {
      query = { $text: { $search: search } };
  }
  try {
      const trades = await Trade.find(query).populate('creator', 'username');
      res.json(trades);
  } catch (error) {
      console.error('Error fetching trades:', error);
      res.status(500).json({ error: 'Error fetching trades: ' + error.message });
  }
}

export const getTradeDetails = async (req, res) => {
  try {
    const { tradeId } = req.params;  // Extract trade ID from the request parameters
    const trade = await Trade.findById(tradeId);  // Find the trade by ID in the database

    if (!trade) {
      return res.status(404).json({ error: "Trade not found" });  // Trade not found response
    }

    res.json(trade);  // Send back the found trade details
  } catch (error) {
    console.error('Error fetching trade details:', error);
    res.status(500).json({ error: "Error fetching trade details" });  // Internal server error response
  }
};
