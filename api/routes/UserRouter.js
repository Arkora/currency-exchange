import express from 'express'
import { register} from '../controllers/UserController.js'

const router = express.Router()

 /**
  * @swagger
  * tags:
  *   name: User
  *   description: User endpoints
  */

 /**
 * @swagger
 * components:
 *   schemas:     
 *      User:
 *       type: object
 *       required: 
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         firstname:
 *           type: string
 *           description: First name of user
 *         lastname:
 *           type: string
 *           description: Last name of user
 *         password:
 *           type: string
 *           description: Last name of user
 *         email:
 *           type: string
 *           description: Email of user
 *         role:
 *           type: string
 *           description: Roles of user
 *         createdAt:
 *           type: date
 *       example:
 *         id: 63dd63a5171dff0747806279
 *         firstname: John
 *         lastname: Doe
 *         email: "john@doe.com"
 *         password: $2b$10$ZaFSvZlpovxO2.ylhVvx6uilX1Ska4xF3JeU662u/Qayziq/dNqMK
 *         role: user
 *         createdAt: 2023-02-03T19:42:29.282+00:00
 */

/**
* @swagger
* components:
*   schemas:     
*      UserRegister:
*       type: object
*       required: 
*         - email
*         - password
*         - firstname
*         - lastname
*       properties:
*         firstname:
*           type: string
*           description: First name of user
*         lastname:
*           type: string
*           description: Last name of user
*         password:
*           type: string
*           description: Last name of user
*         email:
*           type: string
*           description: Email of user
*       example:
*         firstname: John
*         lastname: Doe
*         email: "john@doe.com"
*         password: pksf3423
*/



/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Create User
 *     tags: [User]   
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       200:
 *         content:
 *            application/json:
 *              schema: 
 *                 type: object
 *                 properties:
 *                      message:
 *                          type: string
 *                          example: Signup Successfully
 *      
 * 
 *   
 */

router.post("/register",register)

export default router