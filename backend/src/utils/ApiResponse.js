//This is a utility class designed to standarize successful API response in a Node.js/Express aplication
//It provides a consistent structure for all succesful responses from your API.

class ApiResponse {
    constructor(statusCode, data, message="Success"){
        this.statusCode = statusCode //status code like 201, 200
        this.data = data //data to send in response
        this.message = message //optional success message
        this.success = statusCode < 400 //automatically sets success:true for status code<400(successful response)
    }
}

export {ApiResponse}