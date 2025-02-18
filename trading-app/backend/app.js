import express from "express";
import cors from "cors";
import { userRouter } from "./routes/user.js";
import { tradeRouter } from "./routes/trade.js";
import { offerRouter } from "./routes/offer.js";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the authentication middleware before the routes that require authentication
app.use("/user", userRouter);
app.use("/trade", tradeRouter);
app.use("/offer", offerRouter)
