import mongoose from "mongoose"
import { asyncHandler } from "../middleware/errorMiddleware.js"

const connectToDb = asyncHandler( async () => {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("Connected to Database!")
})  

export default connectToDb 


