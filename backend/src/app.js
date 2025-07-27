import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN, //allowing the origin to access
    credentials: true //option controls whether cookies or authentication headers can be sent
}))

//middlewares
app.use(express.json({limit:"16kb"})) //allowing json data and making available in req.body
app.use(express.urlencoded({extended:true, limit:"16kb"})) // making form data available in req.body
app.use(express.static("public")); // for serving static files
app.use(cookieParser()); //server can update and read cookies from clients browser

//import routes
import healthChckRouter from "./routes/healthcheck.routes.js"
import userRouter from "./routes/user.routes.js"
import videoRouter from "./routes/video.routes.js"
import subscriptionRouter from "./routes/subscription.routes.js"
import playlistRouter from "./routes/playlist.routes.js"
import commentRouter from "./routes/comment.routes.js"
import likeRouter from "./routes/like.routes.js"
import tweetRouter from "./routes/tweet.routes.js"
import dashboardRouter from "./routes/dashboard.routes.js"


//handling route
//statndard practice
app.use("/api/v1/healthcheck", healthChckRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/video", videoRouter)
app.use("/api/v1/subscriptions", subscriptionRouter)
app.use("/api/v1/playlists", playlistRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/like", likeRouter)
app.use("/api/v1/tweet", tweetRouter)
app.use("/api/v1/dashboard", dashboardRouter)


export {app};