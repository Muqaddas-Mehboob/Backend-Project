import express from 'express';
import dotenv from 'dotenv'
import path from 'path'
import connectDb from './config/db.js';

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

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(PORT, () => {
    console.log(`Server connected at port ${PORT}`)
})
