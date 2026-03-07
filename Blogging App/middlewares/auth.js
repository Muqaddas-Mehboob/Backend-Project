import { validateToken } from "../services/auth.js";

export function checkForAuthCookies(cookieName){
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName]

        if(!tokenCookieValue) next();

        try {
            const userPayload = validateToken(tokenCookieValue)
            req.user = userPayload
        } catch (error) {
            console.log("Failed to parse cookie")
        }
        next()
    }
}