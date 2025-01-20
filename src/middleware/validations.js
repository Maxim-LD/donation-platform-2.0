import validator from 'validator' 
import { asyncHandler } from './errorMiddleware.js'


const validPassword = (password) => {
  const hasAlphanumeric = /[a-zA-Z0-9]/
  const hasSymbol = /[^a-zA-Z0-9]/
  const minLength = 6

  return (
    hasAlphanumeric.test(password) &&
    hasSymbol.test(password) &&
    password.length >= minLength
  )
}

const validateSignUp = asyncHandler (async (req, res, next) => {
    const { firstName, lastName, email, password, role } = req.body

    const errors = []

        if (!( firstName && lastName )) {
            errors.push("Please enter your firstname and lastname!")
        }
        if (!email) {
            errors.push("Please enter your email!")
        } else if (!validator.isEmail(email)) {
            errors.push("Incorrect email format!")
        }
        if (!role) {
            errors.push("Please indicate your role!")
        } else if ( role !== "organizer" && role !== "user") {
            errors.push("Invalid role provided!")
        }
        if (!password) {
            errors.push("Enter your password!")
        } else if (!validPassword(password)) {
            errors.push("Password must contain at least 6 alphanumeric characters and a symbol!")
        }

        if (errors.length > 0 ){
            return res.status(400).json({
                message: errors
            })
        }
        next()
})
const validateLogin = asyncHandler (async (req, res, next) => {
    const { email, password } = req.body
    const errors = []
        if (!email) {
            errors.push("Please enter your email!")
        } else if (!validator.isEmail(email)) {
            errors.push("Incorrect email format!")
        }
        if (!password) {
            errors.push("Enter your password!")
        }
        if (errors.length > 0 ){
            return res.status(400).json({ message: errors })
        }
        next()
})

export {
    validateSignUp,
    validateLogin
}
