import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const healthCheck = asyncHandler(async(_, res)=>{
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        {},
        "OK"
    ))
})

export {healthCheck}