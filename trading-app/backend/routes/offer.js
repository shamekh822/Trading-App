import express from "express";
import { getOfferDetails } from "../controllers/offer.js";
import { createOffer } from "../controllers/offer.js";
import { authenticateUser } from "../middleware/authenticate.js";

export const offerRouter = express.Router();


offerRouter.get('/details/:offerId', getOfferDetails);
offerRouter.post('/createOffer', authenticateUser, createOffer)


