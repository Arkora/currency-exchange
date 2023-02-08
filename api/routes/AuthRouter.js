import express from 'express'
import {login} from '../controllers/AuthController.js'

const router = express.Router()

/**
  * @swagger
  * tags:
  *   name: Auth
  *   description: Authentication endpoints
  */

/**
 * @swagger
 * components:
 *   schemas:     
 *      Auth:
 *       type: object
 *       required: 
 *         - email
 *         - password
 *       properties: 
 *         firstname:
 *           type: string
 *         lastname:
 *           type: string
 *         token:
 *           type: string
 *         email:
 *           type: string
 *           description: Email of user
 *         password:
 *           type: string
 *           description: Roles of user 
 *       example: 
 *         firstname: John
 *         lastname: Doe
 *         token: $2b$10$ZaFSvZlpovxO2.ylhVvx6uilX1Ska4xF3JeU662u/Qayziq/dNqMK
 */


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]   
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                email: 
 *                  type: string
 *                  example: john@doe.com
 *                password: 
 *                  type: string
 *                  example: password
 *     responses:
 *       200:
 *         content:
 *            application/json:
 *              schema: 
 *                  $ref: '#/components/schemas/Auth'
 *       401:
 *         content:
 *            application/json:
 *              schema: 
 *                type: object
 *                properties:
 *                  message: 
 *                      type: string
 *                      example: Bad Credentials
 * 
 *   
 */

router.post("/login",login)



export default router