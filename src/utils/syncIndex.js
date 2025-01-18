import mongoose from "mongoose"
import {asyncHandler} from "./middleware/devWare.js"
import Users from "./models/userSchema.js" // Adjust the path to your userSchema file
import dotenv from "dotenv"
import Causes from "./models/causeSchema.js"

dotenv.config()

const syncIndexes = asyncHandler(async () => {
  await mongoose.connect(process.env.MONGODB_URL)
    console.log("Connected to Database!")

    console.log("Synchronizing indexes...")

    await Users.syncIndexes()
    await Causes.syncIndexes()

    console.log("Indexes synchronized successfully...")
  })


syncIndexes()
