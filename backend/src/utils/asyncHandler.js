const asyncHandler = (requestHandler)=>{
    return (req, res, next)=>{
        //converting requestHanler into promise whether function is synch or asynch
        Promise.resolve(requestHandler(req, res, next))
        //catches error thrown in request handler
        //next(err) forward error to Express's error-handling middleware
        .catch((err)=>next(err))
    }
}


export {asyncHandler}
// a higher order function for handling route function
//basically creating a try catch wrapper for router handler
// const asyncHandler = (fn)=>async(req, res, next)=>{
//     try {
            //running the argument function
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success:false,
//             message: error.message
//         })
//     }
// }