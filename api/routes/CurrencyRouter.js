import express from 'express'
import { createCurrency,getAllCurrencies,findCurrency, getCurrency, updateCurrency, deleteCurrency } from '../controllers/CurrencyController.js'
import auth from '../middlewares/Auth.js'

const router = express.Router()

router.get('/',getAllCurrencies)
router.get('/:id',getCurrency)
router.get('/find/:query',findCurrency)
router.post('/create',auth,createCurrency)
router.patch('/update/:id',auth,updateCurrency)
router.delete('/delete/:id',auth,deleteCurrency)

export default router