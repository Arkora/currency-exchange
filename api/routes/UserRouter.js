import express from 'express'
import { register } from '../controllers/UserController.js'

const router = express.Router()

router.post("/register",register)
router.patch("/update")

export default router