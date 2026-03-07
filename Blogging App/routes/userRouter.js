import express, { Router } from 'express'
import User from "../models/user.js"

const router = Router()

router.get('/signin', (req, res) => {
    return res.render('signin')
})

router.get('/signup', (req, res) => {
    return res.render('signup')
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body

    try {
        const token = await User.matchPasswordAndGenerateToken(email, password)

        /* `return res.cookie('token', token).redirect('/')` is a part of the code that handles the POST
        request to sign in a user. Here's what it does: the server can read this cookie to know which 
        user is logged in. */
        return res.cookie('token', token).redirect('/')

    } catch (error) {
        return res.render('signin', {
            error : "Incorrect Username or Password"
        })
    }

})

router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body

    await User.create({
        fullName,
        email,
        password
    })

    return res.redirect('/')
})

router.get('/logout', (req, res) => {
    res.clearCookie('token').redirect("/")
})

export default router