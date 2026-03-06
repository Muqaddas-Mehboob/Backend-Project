import mongoose, { Schema } from "mongoose";
// const {createHmac, randomBytes} = require('node:crypto');
import { createHmac, randomBytes } from "node:crypto";

const userSchema = new Schema({
    fullName:{
        type : String,
        required: true
    },
    email:{
        type : String,
        required: true,
        unique : true
    },
    // salt is used for hashing
    salt : {
        type : String,
    },
    password:{
        type : String,
        required: true
    },
    profileImageUrl :{
        type : String,
        default : '/images/defaultProfilePic.jpg'
    },
    role: {
        type : String,
        enum : ["USER", "ADMIN"],
        default : "USER"
    }
    
},{timestamps : true});

// It lets you do something automatically before data is stored.
userSchema.pre('save', async function (next) {
    const user = this

    if(!user.isModified('password')) return ;

    // const salt = 'somesalt'

    const salt = randomBytes(16).toString()

    /* This line of code is generating a hashed password using the HMAC (Hash-based Message
    Authentication Code) algorithm with SHA-256 hashing function. Here is a breakdown of what each
    part of the code is doing: */
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex')

    this.salt = salt
    this.password = hashedPassword
})

userSchema.statics.matchPassword = async function (email, password) {
    const user = await this.findOne({email})

    if(!user) throw new Error('User not found');

    const salt = user.salt;
    const hashedPassword = user.password

    const userProvidedHash = createHmac('sha256', salt).update(password).digest('hex')

    if(hashedPassword !== userProvidedHash) throw new Error('Incorrect Password')

    return {...user, password: undefined, salt : undefined}
}

const User = mongoose.model('User', userSchema)

export default User