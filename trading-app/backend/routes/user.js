import express from "express";
import { signUp, login,  changePassword, getUserDetails, getUserTrades, getUserOffers } from "../controllers/users.js";
import {authenticateUser} from "../middleware/authenticate.js"

export const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.post("/changePassword", changePassword);
userRouter.get("/user-details", authenticateUser, getUserDetails);
userRouter.get("/user-trades", authenticateUser, getUserTrades);
userRouter.get("/user-offers", authenticateUser, getUserOffers);