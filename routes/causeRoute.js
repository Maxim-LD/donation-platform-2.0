import express, { Router } from 'express'
import { isOrganizer, protect } from '../middleware/authMiddleware.js'
import causeController from '../controller/causeController.js'

const router = express.Router()


router.post("/create_cause", protect, isOrganizer, causeController.createCause)
router.get("/list_causes", causeController.listCauses)

export default router