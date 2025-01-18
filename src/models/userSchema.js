import mongoose from "mongoose"
import passportLocalMongoose from "passport-local-mongoose"

const userSchema = new mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true, unique: true, lowercase: true },
  password: { type: String, require: true },
  userType: { type: String, enum: ["local", "oauth"], required: true, default: "local" },
  providers: [
    {
      provider: { type: String, required: true }, // e.g., "google", "facebook"
      id: { type: String, required: true }, // Provider-specific ID
    },
  ],
  role: { type: String, enum: ["user", "organizer", "admin"], default: "user" },
  uniqueId: { type: String, unique: true, default: null },
  createdAt: { type: Date, default: Date.now },
})

userSchema.plugin(passportLocalMongoose, { usernameField: "email" })

const Users = mongoose.model("User", userSchema)

export default Users 