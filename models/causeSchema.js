import mongoose from 'mongoose'
import Users from './userSchema.js'



const causeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    goalAmount: { type: Number, required: true, default: 0 },
    raisedAmount: { type: Number, required: true, default: 0 },
    creatorId: { type: String, unique: true, required: true },
    causeId: {type: String, unique: true, default: null },
    createdAt: { type: Date, default: Date.now}
})

const Causes = mongoose.model('Cause', causeSchema)

export default Causes