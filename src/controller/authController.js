import bcrypt from "bcrypt"
import Users from "../models/userSchema.js"
import { v4 as uuidv4} from "uuid"
import { generateToken } from "../utils/token.js"
import { asyncHandler } from '../middleware/errorMiddleware.js'
import passport from "passport"

//3 days expiration
const maxAge = 5 * 60
const uniqueId = (role) => {
    const id = uuidv4()
    return role === "organizer" ? `ORG-${id}` : `USR-${id}`
  }

const signUp = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body
 
  if (!firstName || !lastName || !email || !password || !role) {
    return res.status(400).json({ error: "All fields are required" })
  }
  const checkUser = await Users.findOne({ email })
  if (checkUser) {
    return res.status(400).json({ message: "User already exists!" })
  }
  //        const hashedPassword = await bcrypt.hash(password, 12)

  //        const newUser = new Users({ //new instance of Users model is created
  //          firstName,
  //          lastName,
  //          email,
  //          password: hashedPassword,
  //          role,
  //          uniqueId: uniqueId(role)
  //        })

  //        await newUser.save()
  //        const token = await generateToken(newUser)
  //        if (!token) {
  //          throw error.message
  //        }

  //        res.cookie("jwt-signup", token, {
  //         //  httpOnly: true,
  //          maxAge: maxAge * 10000
  //        })
  //        return res.status(201).json({ message: "Account created succesfully!",
  //            user: newUser
  //          })
  //  })

  Users.register(new Users({
      email,
      firstName,
      lastName,
      role,
      uniqueId: uniqueId(role)
    }),
    password,
    (err, user) => {
      if (err) {
        return res.status(500).json({ message: err.message })
      }
      passport.authenticate("local")(req, res, () => {
        res.status(201).json({ 
          message: "User created successfully!",
          user: user 
        })
      })
    }
  )
})
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
    const checkUser = await Users.findOne({ email })
    if (!checkUser) {
      throw { status: 404, message: "User not found!" }
    }
    const checkPassword = await bcrypt.compare(password, checkUser.password)
    if (!checkPassword) {
      throw { status: 401, message: "Incorrect email or password!" }
    }
    const token = await generateToken(checkUser)

    res.cookie("jwt-login", token, {
      maxAge: maxAge * 10000
    })
    return res.status(200).json({
      message: "Logged in succesfully!",
      token: token,
      role: checkUser.role
    })
})
const usersList = asyncHandler (async (req, res) => {
    const users = await Users.find()
    if (users.length === 0 ) {
      return res.status(400).json({
        message: "No user on the database!"
      })
    } 
    const response = users.map((user) => ({
      id: user.uniqueId,
      firstname: user.firstName,
      lastname: user.lastName,
      email: user.email,
      role: user.role,
      date: user.createdAt

    }))
    return res.status(200).json({
      message: "Success!",
      count: users.length,
      users: response
    })
})


export default {
    signUp,
    login,
    usersList,
  }
