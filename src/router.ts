import { Router } from "express"
import { body, param } from "express-validator"
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProductsById,
  updateAvailability,
  updateProduct,
} from "./handlers/products"
import { handleInputErrors } from "./middleware"

const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: interger
 *           description: The Product ID
 *           example: 1
 *         name:
 *           type: string
 *           description: The Product name
 *           example: Teclado Mecanico MECHANIKE 90%
 *         price:
 *           type: number
 *           description: The Product price
 *           example: 400
 *         availability:
 *           type: boolean
 *           description: The Product availability
 *           example: true
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get a list of products
 *    tags:
 *      - Products
 *    description: return a list of products
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *             application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                   $ref: "#/components/schemas/Product"
 */

//Routing
router.get("/", getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags:
 *       - Products
 *     description: Return a product based on its unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful Response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Product"
 *       404:
 *         description: Not found
 *       400:
 *         description: Bad Request - Invalid ID
 */



router.get(
  "/:id",
  param("id").isInt().withMessage("El id no es valido"),
  handleInputErrors,
  getProductsById
)

/**
 * @swagger
 * /api/products:
 *   post:
 *      summary: Creates a new Product
 *      tags:
 *        - Products
 *      description: Returns a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Teclado Gaming MACHENIKE 90%"
 *                          price:
 *                              type: number
 *                              example: 400
 *      responses:
 *          201:
 *              description: Successful response
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Product"
 *          400:
 *              description: Bad Request - invalid input data 
 *      
 */

router.post(
  "/",
  body("name")
    .notEmpty()
    .withMessage("El nombre del producto no pueder ir vacio"),
  body("price")
    .isNumeric()
    .withMessage("Valor no valido")
    .notEmpty()
    .withMessage("El precio del producto no pueder ir vacio")
    .custom((value) => value > 0)
    .withMessage("Precio no valido"),
  handleInputErrors,
  createProduct
)


/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to retrieve
 *            required: true
 *            schema:
 *                type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Teclado Gaming MACHENIKE 90%"
 *                          price:
 *                              type: number
 *                              example: 400
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Successful response
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Product"
 *          400:
 *              description: Bad Request - Invalid ID or input data
 *          404:
 *              description: Product Not Found
 */


router.put(
  "/:id",
  param("id").isInt().withMessage("El id no es valido"),
  body("name")
    .notEmpty()
    .withMessage("El nombre del producto no pueder ir vacio"),
  body("price")
    .isNumeric()
    .withMessage("Valor no valido")
    .notEmpty()
    .withMessage("El precio del producto no pueder ir vacio")
    .custom((value) => value > 0)
    .withMessage("Precio no valido"),
  body("availability").isBoolean().withMessage("Valor no valido"),
  handleInputErrors,
  updateProduct
)


/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *      summary: Updates product availability
 *      tags:
 *          - Products
 *      description: Returns the updated product availability
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to retrieve
 *            required: true
 *            schema:
 *                type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Teclado Gaming MACHENIKE 90%"
 *                          price:
 *                              type: number
 *                              example: 400
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Successful response
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Product"
 *          400:
 *              description: Bad Request - Invalid ID
 *          404:
 *              description: Product Not Found
 */

router.patch(
  "/:id",
  param("id").isInt().withMessage("El id no es valido"),
  handleInputErrors,
  updateAvailability
)






/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *      summary: Deletes a product by given ID
 *      tags:
 *          - Products
 *      description: Returns a confirmation message
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to delete
 *            required: true
 *            schema:
 *                type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          example: "Product deleted successfully"
 *          400:
 *              description: Bad Request - Invalid ID
 *          404:
 *              description: Product Not Found
 */


router.delete(
  "/:id",
  param("id").isInt().withMessage("El id no es valido"),
  handleInputErrors,
  deleteProduct
)

export default router
