import jwt from "jsonwebtoken";
import {verifyToken} from "../utils/token.js"
import { asyncHandler } from "./devWare.js"



const isAdmin = (req, res, next) => {
    const { user } = req.user;
    if (user && (user.role === 'admin')) {
      next()
    } else {
      res.status(403).json({
        message: "Access denied, Admin only!",
        role: user.role
      })
    }
}


const isOrganizer = (req, res, next) => {
  const {user} = req.user
    if (user && (user.role === 'organizer' || user.role === 'admin')) {
      next()
    } else {
        res.status(403).json({
        message: 'Access denied; Organizer only',
        role: user.role
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
    next()

    console.log(decodeToken.user.id)
  })



export {
    isAdmin,
    isOrganizer,
    protect
}