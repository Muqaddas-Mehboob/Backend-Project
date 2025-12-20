import express from "express"
import {generateNewShortURL, handleGetAnalytics} from "../controllers/url.js"

const router = express.Router()

router.post('/',  generateNewShortURL)

router.get('/analytics/:shortId', handleGetAnalytics)

export default router