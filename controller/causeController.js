import { asyncHandler } from "../middleware/devWare.js"
import Causes from "../models/causeSchema.js"
import { v4 as uuidv4 } from "uuid"

const createCause = asyncHandler( async (req, res) => {
    const creatorId = req.user.user.id
    const { title, description, goalAmount  } = req.body

    if(!title || !description || !goalAmount) {
        return res.status(400).json({ message: "Please fill in all fields" })
    }
    const checkCause = await Causes.findOne({
        title: { $regex: new RegExp(title, 'i')}
    })
    if(checkCause) { 
        return res.status(400).json({ message: "Cause already exists" }) 
    }
    const causeId = `CSE-${uuidv4()}`

    const newCause = new Causes({
      creatorId,
      title,
      description,
      causeId,
      goalAmount,
      raisedAmount: 0,
      createdAt: new Date(),
    })
    await newCause.save()
    console.log(`Cause: ${title} created successfully`)
    return res.status(500).json({
        message: "Cause created successfully",  
        cause: newCause
    })
})
const updateCause = asyncHandler( async (req, res) => {

})
const listCauses = asyncHandler( async (req, res)=> {
    const causes = await Causes.find().sort({ createdAt: -1 })
    if (!causes.length === 0) {
        return res.status(404).json({ message: "No causes found" })
    }
    const response = causes.map((cause) => ({
        id: cause._id,
        title: cause.title,
        description: cause.description,
        goalAmount: cause.goalAmount,
    }))

     return res.status(200).json({
      message: "Success!",
      count: causes.length,
      causes: response
    })
    
})

export default { 
    createCause,
    updateCause,
    listCauses
}