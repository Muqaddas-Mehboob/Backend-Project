import express from "express"
import urlRoute from "./routes/urlRoute.js"
import connectDb from "./config/db.js";
import URL from "./models/url.js"
import path from "path"
import staticRoute from "./routes/staticRoute.js"

const app = express();
const port = 3000;

connectDb();

// ADDING VIEW ENGINE AND PATH OF VIEWS
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use('/', staticRoute)

app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});

  res.render(
    "home",
    {
      urls : allUrls
    }
  )

  // return res.end(`
  //   <html>
  //     <head></head>
  //       <body>
  //         <ol>
  //           ${allUrls.map((url, index) => `
  //             <li>
  //               ${url.shortId} - ${url.redirectURL} - ${url.visitHistory.length}
  //             </li>`).join('')}
  //         </ol>
  //       </body>
  //   </html>`
  // )
})

app.use("/url", urlRoute)
app.get("/url/:shortId", async (req, res) => {
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

app.listen(port, () => {
  console.log(`Listening from port ${port}`);
})