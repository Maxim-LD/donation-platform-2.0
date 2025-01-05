import jwt from "jsonwebtoken";
import {verifyToken} from "../utils/token.js"
import { asyncHandler } from "./devWare.js"
import Users from "../models/userSchema.js";

const isAdmin = (permissions) => {
  return (req, res, next) => {
    const userRole = req.body.role

    if (permissions.includes(userRole)) {
      next()
    }  
    return res.json({
        message: "Access denied; Admin only",
        userRole: userRole
      })
    }
}



const isOrganizer = (req, res, next) => {
    if (req.user && (req.user.role === 'organizer' || req.user.role === 'admin')) {
        next()
    } else {
        res.status(403).json({
            message: 'Access denied; Organizer only'
        })
    }
}

const protect = asyncHandler (async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "")

  if (!token) {
    return res.status(401).json({
       message: "Access denied. No token provided."
      })
  }
  
    const decodeToken = await verifyToken(token)
    req.user = decodeToken

    // const decoded = jwt.verify(token, process.env.SECRET_KEY)
    // console.log(token)
    // // const checkDB = await Users.findOne({ email: decoded.token.email })

    // // if (!checkDB) {
    // //   return res.status(404).json({
    // //     message: "User not found1",
    // //   })
    // // }

    next()
  })



export {
    isAdmin,
    isOrganizer,
    protect
}