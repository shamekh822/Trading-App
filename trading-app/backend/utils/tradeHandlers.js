// tradeHandlers.js

import mongoose from "mongoose";
import { Trade } from "../models/trade.js"
// import { Offer } from "./models/offers.js";

/**
 * Accept an offer and close the trade.
 * @param {string} tradeId - The ID of the trade.
 * @param {string} offerId - The ID of the offer to accept.
 * @returns {Promise<{success: boolean, message: string}>}
 */
// Inside ./utils/tradeHandlers.js

export const acceptOffer = async (tradeId, offerId) => {
    try {
      // Example logic to update the trade as accepted and closed
      const trade = await Trade.findByIdAndUpdate(tradeId, {
        acceptedOffer: offerId,
        status: 'closed', // Add a status field in your schema if you don't have one
      }, { new: true });
  
      if (trade) {
        return { success: true, message: 'Offer accepted' };
      } else {
        return { success: false, message: 'Trade not found' };
      }
    } catch (error) {
      console.error('Error in acceptOffer:', error);
      return { success: false, message: 'Database error' };
    }
  };
  

/**
 * Reject an offer.
 * @param {string} tradeId - The ID of the trade.
 * @param {string} offerId - The ID of the offer to reject.
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function rejectOffer(tradeId, offerId) {
    try {
        // You could optionally remove the offer from the trade's offers list if needed.
        // For now, we'll just return a success message without modifying the database.
        return { success: true, message: "Offer rejected" };
    } catch (error) {
        console.error('Error rejecting offer:', error);
        return { success: false, message: "Error processing your request" };
    }
}
