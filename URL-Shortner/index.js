import express from "express"
import urlRoute from "./routes/urlRoute.js"
import connectDb from "./connect.js";

const app = express();
const port = 3000;

connectDb();

app.use(express.json())

app.use("/url", urlRoute)

app.get("/", (req, res) => {
    res.send("Hello from the server");
});

app.listen(port, () => {console.log(`Listening from port ${port}`);
})