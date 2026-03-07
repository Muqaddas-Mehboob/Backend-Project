import jwt from "jsonwebtoken";

const secret = "Muqaddas"

export function createTokenForUser(user){
    const payload = {
        _id : user._id,
        email : user.email,
        profileImageUrl : user.profileImageUrl,
        role : user.role

    }

    const token = jwt.sign(payload, secret)

    return token
}

export function validateToken (token) {
    const payload = jwt.verify(token, secret)
    return payload
}