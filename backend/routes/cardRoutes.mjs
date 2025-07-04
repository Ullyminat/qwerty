import express from "express";
import CardController from "../controllers/cardController.mjs";
import { authToken } from "../middleware/authtoken.mjs";
import roleCheck from "../middleware/rolecheck.mjs";

const router = express.Router();

router.post("/", authToken, roleCheck('admin'), CardController.createCard);
router.get("/", authToken, CardController.getAllCards);
router.delete("/:id", authToken, roleCheck('admin'), CardController.deleteCard);

export default router;