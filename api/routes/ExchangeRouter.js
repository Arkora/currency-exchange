import express from 'express'
import { calculateConversion, createExchange, deleteExchange, findExchange, getAllExchanges, getExchange, updateExchange } from '../controllers/ExchangeController.js'
import auth from '../middlewares/Auth.js'

const router = express.Router()

router.get('/',getAllExchanges)
router.get('/convert',calculateConversion)
router.get('/:id',getExchange)
router.get('/search/:query',findExchange)
router.post('/create',auth,createExchange)
router.patch('/update/:id',auth,updateExchange)
router.delete('/delete/:id',auth,deleteExchange)

export default router