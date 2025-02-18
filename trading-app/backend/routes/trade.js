import express from "express";
import { createTrade, listTrades, getTradeDetails} from "../controllers/trade.js";
import { authenticateUser } from "../middleware/authenticate.js";

export const tradeRouter = express.Router();

tradeRouter.post("/create-trade", authenticateUser,  createTrade);

tradeRouter.get("/browse", listTrades)

tradeRouter.get('/details/:tradeId', getTradeDetails);


