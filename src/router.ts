import { Router } from "express"
import { body } from "express-validator"
import { createProduct } from "./handlers/products"
import { handleInputErrors } from "./middleware"

const router = Router()

//Routing
router.get("/", (req, res) => {
  res.json("Desde GET")
})

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

router.put("/", (req, res) => {
  res.json("Desde PUT")
})

router.patch("/", (req, res) => {
  res.json("Desde PATCH")
})

router.delete("/", (req, res) => {
  res.json("Desde DELETE")
})

export default router
