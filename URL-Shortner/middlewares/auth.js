import { getUser } from "../services/auth.js"

export async function restrictToLoggedInUser(req, res, next) {
    const userUid = req.cookies?.uid

    if (!userUid) return res.redirect('/login')

    const user = await getUser(userUid)  // ✅ await added

    if (!user) return res.redirect('/login')

    req.user = user
    next()
}

export async function checkAuth(req, res, next) {
    const userUid = req.cookies?.uid

    const user = await getUser(userUid)  // ✅ await added

    req.user = user
    next()
}