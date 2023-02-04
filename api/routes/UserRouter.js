import express from 'express'
import { register,getUserInfo } from '../controllers/UserController.js'
import auth from '../middlewares/Auth.js'

const router = express.Router()

router.get("/info",auth,getUserInfo)
router.post("/register",register)
router.patch("/update")

export default router