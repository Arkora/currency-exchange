import express from 'express'
import { createCurrency,getAllCurrencies,findCurrency, getCurrency, updateCurrency, deleteCurrency } from '../controllers/CurrencyController.js'
import auth from '../middlewares/Auth.js'

const router = express.Router()

router.get('/',getAllCurrencies)
router.get('/:id',getCurrency)
router.get('/find/:query',findCurrency)
router.post('/create',auth,createCurrency)
router.patch('/update/:id',updateCurrency)
router.delete('/delete/:id',deleteCurrency)

export default router