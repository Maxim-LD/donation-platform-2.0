import express from 'express'
import { validateSignUp, validateLogin }  from '../middleware/validations.js'
import { protect, isAdmin, isOrganizer } from '../middleware/authMiddleware.js'
import authController from '../controller/authController.js'

const router = express.Router()

router.post("/sign_up", validateSignUp, authController.signUp)
router.post("/login", validateLogin, authController.login)
router.post("/logIn", validateLogin, authController.login)

//protected route
router.get("/users", protect, isAdmin, authController.usersList)



export default router