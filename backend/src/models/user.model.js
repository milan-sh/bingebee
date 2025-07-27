import mongoose,{Schema} from "mongoose";
import bycrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true //this is an optimize way if you want to enable searching in mongodb
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    fullName:{
        type:String,
        required:true,
        trim:true
    },
    avatar:{
        type:String, //cloudinary url
        required:true
    },
    coverImage:{
        type:String, //cloudinary url
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password:{
        type:String,
        required: [true, 'Password is required']
    },
    refreshToken:{
        type:String
    }
}, {timestamps:true})

//mogoose middleware for hashing the password before it save
userSchema.pre("save", async function (next) {
    //checking only if password is modified then hash the password otherwise do other changes
    if(!this.isModified("password")) return next();

    this.password = await bycrypt.hash(this.password, 10)
    next();
})

//password checking mehtod
userSchema.methods.isPasswordCorrect = async function (password) {
    //checking whether password is correct or not
    return await bycrypt.compare(password, this.password)
}

//token generation methods

//access token generation syntax
userSchema.methods.generateAcessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

//refresh token generation syntax
//refresh token has less info compate to access token
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User", userSchema)