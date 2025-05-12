//standardization of API Error
//creating a child Error by inheriting node's Error class
//this is the best practice
class ApiError extends Error{
    constructor(
        statusCode,
        message="Something went wrong",
        errors=[],
        stack=""
    ){
        super(message)
        this.statusCode = statusCode //status code like 404, 401
        this.data = null //additional error data (usually null)
        this.message = message //error description
        this.success = false // always false
        this.errors = errors // ["Email is invalid", "Password is too short"]

        //optional
        if(stack){
            this.stack = stack //use a custom stack race if provided
        }else{
            Error.captureStackTrace(this, this.constructor) //create stack trace(file, line number where error occurred)
        }
    }
}

export {ApiError}