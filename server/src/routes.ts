import express from "express";
import Controller from "./controller";

const router = express.Router();

router.get("/", Controller.SendHello);
router.post("/createWallet", Controller.createUserWallet);

export default router;
