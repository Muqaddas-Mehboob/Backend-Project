import express from 'express';
import dotenv from 'dotenv'
import path from 'path'
import connectDb from './config/db.js';
import userRouter from './routes/userRouter.js'
import cookieParser from 'cookie-parser';
import { checkForAuthCookies } from './middlewares/auth.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 8080

connectDb()

app.set('view engine', 'ejs')

/* `app.set('views', path.resolve('./views'))` is setting the directory where the views (templates) for
the application are located. In this case, it is setting the views directory to be resolved relative
to the current working directory, specifically to a folder named 'views'. This allows the
application to know where to look for the view files when rendering templates. */
app.set('views', path.resolve('./views'))

/* We use express.urlencoded() in Express.js to read form data that comes from the browser
This converts the form data into a JavaScript object. */
app.use(express.urlencoded({extended : false}))

app.use('/user', userRouter)
app.use(cookieParser())
app.use(checkForAuthCookies('token'))

app.get('/', (req, res) => {
    res.render('home', { user : req.user})
})

app.listen(PORT, () => {
    console.log(`Server connected at port ${PORT}`)
})
