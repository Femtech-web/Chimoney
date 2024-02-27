import express from "express";
import Controller from "./controller";
import ValidateUser from "./middleware";

const router = express.Router();

router.get("/", Controller.SendHealth);
router.get("/wallet", ValidateUser, Controller.fetchWallet)
router.post("/createWallet", Controller.createUserWallet);
router.post("/payout", ValidateUser, Controller.payoutChimoney);

export default router;
