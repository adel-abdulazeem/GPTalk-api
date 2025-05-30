import express from "express";
import { ensureAuth } from "../middleware/authMiddleWare.js";
import { getIndex, getScraped, postScraped } from "../controllers/scrapeController.js";

const router = express.Router();
router.get("/", getIndex);
router.get('/scrape', getScraped)
router.post('/post', ensureAuth, postScraped)


export default router;
