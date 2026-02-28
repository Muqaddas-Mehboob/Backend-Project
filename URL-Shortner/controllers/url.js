import shortid from "shortid";
import URL from "../models/url.js";

export async function generateNewShortURL(req, res) {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const shortID = shortid(8);

    await URL.create({
      shortId : shortID,
      redirectURL: url,
      visitHistory: [],
      createdBy: req.user._id
    });

    // return res.render('home', {
    //   id : shortID,
    // })
    const allUrls = await URL.find({createdBy : req.user._id});
    return res.render('home', {
    id: shortID,
    urls: allUrls,
})
    // return res.json({ id : shortID });
    
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({ 
        totalClicks : result.visitHistory.length, 
        analytics : result.visitHistory
    })
}