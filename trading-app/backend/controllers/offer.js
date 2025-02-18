import { Trade } from "../models/trade.js"; 
import { Offer } from "../models/offers.js";

export const createOffer = async (req, res) => {
  try {
    const { cashOffered, tradeId } = req.body;
    const userId = req.user._id;  // The authentication middleware should set this.

    // Check if cashOffered and tradeId are provided.
    if (!tradeId || cashOffered === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if the trade exists and is open for offers.
    const trade = await Trade.findById(tradeId);
    if (!trade) {
      return res.status(404).json({ error: "Trade not found" });
    }
    if (trade.acceptedOffer) {
      return res.status(400).json({ error: "Trade is no longer open for offers" });
    }

    // Create a new offer.
    const newOffer = new Offer({
      user: userId,
      cashOffered,
      trade: tradeId
    });

    const savedOffer = await newOffer.save();

    // Add the new offer to the trade.
    await Trade.findByIdAndUpdate(tradeId, {
      $push: { offers: savedOffer._id }
    });

    return res.status(201).json({ offer: savedOffer });
  } catch (error) {
    console.error('Failed to create offer:', error);
    return res.status(500).json({ error: error.message });
  }
};

export const getOfferDetails = async (req, res) => {
  try {
    const { offerId } = req.params;  // Extract offer ID from the request parameters
    const offer = await Offer.findById(offerId)  // Find the offer by ID in the database
                        .populate('user', 'username')  // Assuming you want to return the username of the user who made the offer
                        .populate('trade', 'title');   // And the title of the trade for which the offer was made

    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });  // Offer not found response
    }

    res.json(offer);  // Send back the found offer details
  } catch (error) {
    console.error('Error fetching offer details:', error);
    res.status(500).json({ error: "Error fetching offer details" });  // Internal server error response
  }
};
