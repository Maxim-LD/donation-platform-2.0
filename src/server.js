import express from 'express'
import dotenv from 'dotenv'
import session from 'express-session'
import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import connectToDb from './config/db.js'
import authRoute from './routes/authRoute.js'
import causeRoute from './routes/causeRoute.js'
import {asyncHandler, errorHandler} from './middleware/errorMiddleware.js'
import Users from './models/userSchema.js'



dotenv.config()

const app = express()
app.use(express.json())


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

await connectToDb()

passport.use(Users.createStrategy())//creates a new local strategy using the User.authenticate() method


passport.serializeUser(Users.serializeUser())//responsible for reading the user data from the session
passport.deserializeUser(Users.deserializeUser())


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})




app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome to Max Donation 2.0 Platform server!",
  })
})

app.use("/api", authRoute)
app.use("/api", causeRoute)

app.use(errorHandler)

app.use((req, res) => {
  res.status(404).json({
    message: "This endpoint does not exist!",
  })
})
