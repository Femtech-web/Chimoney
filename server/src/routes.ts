import express from "express";
import Controller from "./controller";
import ValidateUser from "./middleware";

const router = express.Router();

router.get("/", Controller.SendHealth);
router.post("/createWallet", Controller.createUserWallet);
router.post("/login", Controller.loginUser);
router.get("/wallet", ValidateUser, Controller.fetchWallet);
router.post("/transaction", ValidateUser, Controller.fetchSingleTransaction);
router.post("/payout", ValidateUser, Controller.payoutChimoney);

export default router;
