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

//Routing
router.get("/", getProducts)
router.get(
  "/:id",
  param("id").isInt().withMessage("El id no es valido"),
  handleInputErrors,
  getProductsById
)

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

router.patch(
  "/:id",
  param("id").isInt().withMessage("El id no es valido"),
  handleInputErrors,
  updateAvailability
)

router.delete(
  "/:id",
  param("id").isInt().withMessage("El id no es valido"),
  handleInputErrors,
  deleteProduct
)

export default router
