import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

//function to connect with database
//always remeber DATABASE IS IN ANOTHER CONTINENT
//so always use async/await for database connection as it may take time 
// wrap the code in try-catch
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        // good practice knowing on which database we are woking as there will be test, local or production database
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection error", error)
        //unsuccessful exit(error occured)
        //terminating the process means stopping node application
        process.exit(1) // Unsuccessful exit(error occurred)
    }
};

export default connectDB;