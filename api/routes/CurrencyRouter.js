import express from 'express'
import { createCurrency,getAllCurrencies,findCurrency, getCurrency, updateCurrency, deleteCurrency } from '../controllers/CurrencyController.js'
import auth from '../middlewares/Auth.js'

const router = express.Router()

/**
  * @swagger
  * tags:
  *   name: Currency
  *   description: Currency endpoints
  */

/**
 * @swagger
 * components:
 *   schemas:
 *     Currency:
 *       type: object
 *       required:
 *         - name
 *         - currency
 *         - symbol
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the currency
 *         name:
 *           type: string
 *         currency:
 *           type: string
 *         symbol:
 *           type: string
 *       example:
 *         id: 63dd63a5171dff0747806279
 *         name: Dollar
 *         currency: USD
 *         symbol: $
 */

/**
 * @swagger
 * /currency/:
 *   get:
 *     summary: Get All Currencies
 *     tags: [Currency]
 *     responses:
 *       200:
 *         description: 
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Currency'
 */

/**
 * @swagger
 * /currency/{id}:
 *   get:
 *     summary: Get Currency by id
 *     tags: [Currency]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: 
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Currency'
 *       404:
 *         content:
 *            application/json:
 *              schema: 
 *                type: object
 *                properties:
 *                  message: 
 *                      type: string
 *                      example: Currency doesn't exist
 */

/**
* @swagger
* /currency/find/{query}:
*   get:
*     summary: Find Currencies by searching term
*     tags: [Currency]
*     parameters:
*       - in: path
*         name: query
*         schema:
*           type: string
*         required: true
*     responses:
*       200:         
*         content:
*           application/json:
*              schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Exchange'
*/

/**
 * @swagger
 * /currency/create:
 *   post:
 *     summary: Create currency
 *     security:
 *       bearerAuth: []
 *     tags: [Currency]   
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                name: 
 *                  type: string
 *                  example: Dollar
 *                currency: 
 *                  type: string
 *                  example: USD
 *                symbol: 
 *                  type: string
 *                  example: $
 *     responses:
 *       200:
 *         content:
 *            application/json:
 *              schema: 
 *                 type: object
 *                 properties:
 *                      message:
 *                          type: string
 *                          example: Currency created Successfully
 *       400:
 *         content:
 *            application/json:
 *              schema: 
 *                type: object
 *                properties:
 *                  name: 
 *                      type: string
 *                      example: Name is required
 *                  currency: 
 *                      type: string
 *                      example: Currency is required
 *                  symbol: 
 *                      type: string
 *                      example: Symbol is required
 *   
 */

/**
 * @swagger
 * /currency/update/{id}:
 *   patch:
 *     summary: Update currency
 *     security:
 *       bearerAuth: []
 *     tags: [Currency]
 *     parameters:
 *       - in: path
 *         name: query
 *         schema:
 *           type: string
 *         required: true   
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                name: 
 *                  type: string
 *                  example: Dollar
 *                currency: 
 *                  type: string
 *                  example: USD
 *                symbol: 
 *                  type: string
 *                  example: $
 *     responses:
 *       200:
 *         content:
 *            application/json:
 *              schema: 
 *                 type: object
 *                 properties:
 *                      message:
 *                          type: string
 *                          example: Currency updated Successfully
 *                      updated:
 *                            type: object
 *                            properties:
 *                               _id: 
 *                                  type: string
 *                               name: 
 *                                  type: string
 *                               currency: 
 *                                  type: string
 *                               symbol: 
 *                                  type: string
 *
 *   
 */

/**
 * @swagger
 * /currency/delete/{id}:
 *   delete:
 *     summary: Delete Currency by id
 *     security:
 *       bearerAuth: []
 *     tags: [Currency]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: 
 *         content:
 *           application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                      message:
 *                          type: string
 *                          example: Currency deleted Successfully
 */

router.get('/',getAllCurrencies)
router.get('/:id',getCurrency)
router.get('/find/:query',findCurrency)
router.post('/create',auth,createCurrency)
router.patch('/update/:id',auth,updateCurrency)
router.delete('/delete/:id',auth,deleteCurrency)

export default router