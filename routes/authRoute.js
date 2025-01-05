import express from 'express'
import authController from "../controller/authController.js"
import { validateSignUp, validateLogin }  from '../middleware/validations.js'
import { protect, isAdmin, isOrganizer } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post("/sign_up", validateSignUp, authController.signUp)
router.post("/login", validateLogin, authController.login)

//protected route
router.get("/users", protect, isAdmin(['admin']), authController.usersList)


export default router