import express from "express"
import urlRoute from "./routes/urlRoute.js"
import connectDb from "./config/db.js";
import URL from "./models/url.js"

const app = express();
const port = 3000;

connectDb();

app.use(express.json())
app.use(express.urlencoded({ extended: true })); 

app.use("/url", urlRoute)
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId: shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
    { new: true }
  );

  if (!entry) {
    return res.status(404).send("URL not found");
  }

  res.redirect(entry.redirectURL);
});

app.listen(port, () => {console.log(`Listening from port ${port}`);
})