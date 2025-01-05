import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true, unique: true, lowercase: true },
  password: { type: String, require: true },
  role: { type: String, 
    enum: [ 'user', 'organizer', 'admin' ],
    default: 'user'
  },
  uniqueId: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
})

const Users = mongoose.model("User", userSchema)

export default Users 