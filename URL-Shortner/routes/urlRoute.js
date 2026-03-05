import express from "express"
import {generateNewShortURL, handleGetAnalytics} from "../controllers/url.js"
import { checkAdmin } from "../middlewares/auth.js"

const router = express.Router()

router.post('/',  generateNewShortURL)

router.get('/analytics/:shortId', handleGetAnalytics)

// ✅ Admin-only: view all URLs
router.get("/admin/all", checkAdmin, async (req, res) => {
  const allUrls = await URL.find().populate("owner", "email name");
  res.render("adminUrls", { urls: allUrls });
});

export default router