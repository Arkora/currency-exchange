import express from 'express'
import { calculateConversion, createExchange, deleteExchange, findExchange, getAllExchanges, getExchange, updateExchange } from '../controllers/ExchangeController.js'
import auth from '../middlewares/Auth.js'

const router = express.Router()

/**
  * @swagger
  * tags:
  *   name: Exchange
  *   description: Exchange endpoints
  */

/**
 * @swagger
 * components:
 *   schemas:
 *     Exchange:
 *       type: object
 *       required:
 *         - from
 *         - to
 *         - ratio
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the Exchange
 *         from:
 *           type: string
 *           description: From currency for conversion
 *         to:
 *           type: string
 *           description: To currency for conversion
 *         ratio:
 *           type: number
 *           description: Conversion ratio 
 *       example:
 *         id: 63dd63a5171dff0747806279
 *         name: usdtoeur
 *         from: USD
 *         to: EUR
 *         ratio: 1.25
 */

 /**
 * @swagger
 * /exchange/:
 *   get:
 *     summary: Get All Exchanges
 *     tags: [Exchange]
 *     responses:
 *       200:
 *         description: 
 *         content:
 *           application/json:
 *              schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exchange'
 */

 /**
* @swagger
* /exchange/convert:
*   get:
*     summary: Convert currency
*     tags: [Exchange]
*     parameters:
*       - in: query
*         name: from
*         schema:
*           type: string
*         required: true
*       - in: query
*         name: to
*         schema:
*           type: string
*         required: true
*       - in: query
*         name: ammount
*         schema:
*           type: number
*         required: true
*     responses:
*       200:
*         content:
*           application/json:
*                schema:
*                   type: object
*                   properties:
*                      total:
*                          type: number
*                          example: 45.2
*                      fromSymbol:
*                          type: string
*                          example: $
*                      ratio:
*                          type: number
*                          example: 1.24
*       404:
*         content:
*            application/json:
*              schema: 
*                type: object
*                properties:
*                  message: 
*                      type: string
*                      example: Conversion doesn't exist
*       400:
*         content:
*            application/json:
*              schema: 
*                type: object
*                properties:
*                  message: 
*                      type: string
*                      example: Can't convert same currency
*/

/**
* @swagger
* /exchange/{id}:
*   get:
*     summary: Get Exchange by id
*     tags: [Exchange]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*     responses:
*       200:
*         content:
*           application/json:
*              schema:
*                 $ref: '#/components/schemas/Exchange'
*       404:
*         content:
*            application/json:
*              schema: 
*                type: object
*                properties:
*                  message: 
*                      type: string
*                      example: Conversion doesn't exist
*/

/**
* @swagger
* /exchange/search/{query}:
*   get:
*     summary: Find Exchanges by searching term
*     tags: [Exchange]
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
*       404:
*         content:
*            application/json:
*              schema: 
*                type: object
*                properties:
*                  message: 
*                      type: string
*                      example: Conversion doesn't exist
*/

/**
 * @swagger
 * /exchange/create:
 *   post:
 *     summary: Create exchange
 *     security:
 *       bearerAuth: []
 *     tags: [Exchange]   
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                from: 
 *                  type: string
 *                  example: USD
 *                to: 
 *                  type: string
 *                  example: EUR
 *                ratio: 
 *                  type: number
 *                  example: 0.84
 *     responses:
 *       200:
 *         content:
 *            application/json:
 *              schema: 
 *                 type: object
 *                 properties:
 *                      message:
 *                          type: string
 *                          example: Exchange created Successfully
 *       406:
 *         content:
 *            application/json:
 *              schema: 
 *                type: object
 *                properties:
 *                  message: 
 *                      type: string
 *                      example: Currencies can't be same
 *       400:
 *         content:
 *            application/json:
 *              schema: 
 *                type: object
 *                properties:
 *                  from: 
 *                      type: string
 *                      example: From is required
 *                  to: 
 *                      type: string
 *                      example: To is required
 *                  ratio: 
 *                      type: string
 *                      example: Ratio is required
 *       404:
 *         content:
 *            application/json:
 *              schema: 
 *                type: object
 *                properties:
 *                  message: 
 *                      type: string
 *                      example: Conversion doesn't exist
 *   
 */

/**
 * @swagger
 * /exchange/update/{id}:
 *   patch:
 *     summary: Update exchange
 *     security:
 *       bearerAuth: []
 *     tags: [Exchange] 
 *     parameters:
 *       - in: path
 *         name: id
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
 *                ratio: 
 *                  type: number
 *                  example: 0.84
 *     responses:
 *       200:
 *         content:
 *            application/json:
 *              schema: 
 *                 type: object
 *                 properties:
 *                      message:
 *                          type: string
 *                          example: Currency Updated Successfull
 *                      updated:
 *                            type: object
 *                            properties:
 *                               _id: 
 *                                  type: string
 *                               from: 
 *                                  type: string
 *                               to: 
 *                                  type: string
 *                               ratio: 
 *                                  type: number 
 *       404:
 *         content:
 *            application/json:
 *              schema: 
 *                type: object
 *                properties:
 *                  message: 
 *                      type: string
 *                      example: Conversion doesn't exist
 *       400:
 *         content:
 *            application/json:
 *              schema: 
 *                type: object
 *                properties:                 
 *                  ratio: 
 *                      type: string
 *                      example: Ratio can't have negative value or 0
 *
 *   
 */

/**
* @swagger
* /exchange/delete/{id}:
*   delete:
*     summary: Delete by id
*     tags: [Exchange]
*     security:
*       bearerAuth: []
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
*                   message:
*                       type: string
*       404:
*         content:
*            application/json:
*              schema: 
*                type: object
*                properties:
*                  message: 
*                      type: string
*                      example: Conversion doesn't exist
*/


router.get('/',getAllExchanges)
router.get('/convert',calculateConversion)
router.get('/:id',getExchange)
router.get('/search/:query',findExchange)
router.post('/create',auth,createExchange)
router.patch('/update/:id',auth,updateExchange)
router.delete('/delete/:id',auth,deleteExchange)

export default router