import jwt from "jsonwebtoken";
const secret = "Muqaddas"

// const sessionIdToUserMap = new Map();

// export function setUser(id, user){
//     //--> STATEFUL AUTH
//     // sessionIdToUserMap.set(id, user) 

// }

export function setUser(user){
    // --> STATELESS AUTH (generate tokens)
    return jwt.sign({
        _id : user._id,
        name : user.name
        // email: user.email
    }, secret)
}

// export function getUser(id){
//     //--> STATEFUL AUTH
//     return sessionIdToUserMap.get(id)
// }

export function getUser(token){
    if(!token) return null
    try {
        return jwt.verify(token, secret)
    } catch(err) {
        return null  
    }
}