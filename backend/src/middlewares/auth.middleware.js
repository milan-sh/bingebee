import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"


export const verifyJWT = asyncHandler(async(req, _, next)=>{
    try {
        //getting the token from cookie or header as we are handling both case means app or web 
        //cookies will be available in req because we've set cookies at user's broswer while doing login and user will send when doing loging
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if(!token){
            throw new ApiError(401, "Unauthorized acess")
        }

        //decoding the token
        const decocdedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        //finding user from db and removing sensitive information
        const user = await User.findById(decocdedToken?._id).select("-password -refreshToken")

        if(!user){
            throw new ApiError(401, "Invalid access token")
        }

        //adding the founded user in request so we can use this in controllers
        req.user = user
        next();

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})