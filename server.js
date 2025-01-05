import express from 'express'
import dotenv from 'dotenv'
import connectToDb from './utils/db.js'
import authRoute from './routes/authRoute.js'
import {asyncHandler, errorHandler} from './middleware/devWare.js'


dotenv.config()
const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000

await connectToDb()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})




app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome to Max Donation 2.0 Platform server!",
  })
})

app.use("/api", authRoute)

app.use(errorHandler)

app.use((req, res) => {
  res.status(404).json({
    message: "This endpoint does not exist!",
  })
})
