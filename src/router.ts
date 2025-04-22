import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProductsById,
  updateAvailability,
  updateProduct,
} from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router();

/**
 * @swagger
 * components:
 *    schemas:
 *        Product:
 *            type: object
 *            properties:
 *                id:
 *                    type: integer
 *                    description: The product ID
 *                    example: 1
 *                name:
 *                    type: string
 *                    description: The product name
 *                    example: Monitor Curvo 49 Pulgadas
 *                price: 
 *                    type: number
 *                    description: The Product price
 *                    example: 300
 *                availability:
 *                    type: boolean
 *                    description: The Product availability
 *                    example: true
 */

/**
 * @swagger
 * /api/products:
 *    get:
 *      summary: Get a list of products
 *      tags: 
 *         - Products
 *      description: Return a list of products
 *      responses: 
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                            $ref: '#/components/schemas/Product'
 */

router.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags:
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to retrieve
 *            required: true
 *            schema:
 *                type: integer
 *      responses:
 *        200:
 *          description: Successful response
 *          content:
 *            application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Product'
 *        404:
 *         description: Product not found
 * 
 *        400:
 *         description: Bad request - invalid ID
 * 
 */

router.get(
  "/:id",

  param("id").isInt().withMessage("ID no valido"),
  handleInputErrors,
  getProductsById
);

/**
 * @swagger
 * /api/products:
 *   post:
 *       summary: Create a new product
 *       tags:
 *           - Products
 *       description: Returns a new record in the database
 *       requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                     name:
 *                       type: string
 *                       example: Monitor Curvo 49 Pulgadas
 *                     price:
 *                        type: number
 *                        example: 399  
 * 
 *       responses:
 *          201:
 *            description: Successful response
 *            content:
 *               application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/Product'
 * 
 *          400:
 *            description: Bad request - invalid input
 */

router.post(
  "/",
  // Validar campos
  body("name").notEmpty().withMessage("El nombre es requerido"),
  body("price")
    .isNumeric()
    .withMessage("Valor no valido")
    .notEmpty()
    .withMessage("El precio es requerido")
    .custom((value) => value > 0)
    .withMessage("Precio no valido"),

  handleInputErrors,
  createProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *      summary: Updates a product whith user input
 *      tags:
 *         - Products
 *      description: Returns the updated product
 *      parameters:
 *         - in: path
 *           name: id
 *           description: The ID of the product to retrieve
 *           required: true
 *           schema:
 *              type: integer
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                      name:
 *                          type: string
 *                          example: Monitor Curvo 49 Pulgadas
 *                      price:
 *                          type: number
 *                          example: 399
 *                      availability:
 *                         type: boolean
 *                         example: true
 * 
 *      responses:
 *         200:
 *            description: Successful response
 *            content:
 *               application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/Product'
 * 
 *         400:
 *            description: Bad request - invalid ID or input
 * 
 *         404:
 *            description: Product not found
 * 
 */


router.put(
  "/:id",
  // Validar campos
  param("id").isInt().withMessage("ID no valido"),
  body("name").notEmpty().withMessage("El nombre es requerido"),
  body("price")
    .isNumeric()
    .withMessage("Valor no valido")
    .notEmpty()
    .withMessage("El precio es requerido")
    .custom((value) => value > 0)
    .withMessage("Precio no valido"),
  body("availability").isBoolean().withMessage("Valor no valido"),
  handleInputErrors,
  updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *     summary: Updates a product availability
 *     tags:
 *        - Products
 *     description: Returns the updated availability
 *     parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *             type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *            application/json:
 *                schema:
 *                    $ref: '#/components/schemas/Product'
 * 
 *       400:
 *          description: Bad request - invalid ID or input data
 *  
 *       404:
 *          description: Product not found
 */

router.patch(
  "/:id",
  param("id").isInt().withMessage("El id debe ser un numero entero"),
  handleInputErrors,
  updateAvailability
);

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *     summary: Deletes a product by ID
 *     tags:
 *        - Products
 *     description: Deletes a product based on its unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to delete
 *         required: true
 *         schema:
 *           type: integer
 * 
 *     responses:
 *      200:
 *        description: Successful response
 *        content:
 *         application/json:
 *           schema:
 *              type: string
 *              example: Product deleted successfully
 * 
 *      400:
 *        description: Bad request - invalid ID
 * 
 *      404:
 *        description: Product not found
 *            
 *              
 * 



 */

router.delete(
  "/:id",
  param("id").isInt().withMessage("ID no valido"),
  handleInputErrors,
  deleteProduct
);

export default router;
