import { Response, Request } from "express"
import Product from "../models/Products.model"

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.findAll({
    order: [
      ["id", "DESC"]
    ],
  })
  res.json({ data: products })
}

export const getProductsById = async (req: Request, res: Response) => {
  const { id } = req.params
  const product = await Product.findByPk(id)
  if (!product) {
    res.status(404).json({ error: "Producto no encontrado" })
    return
  }

  res.json({ data: product })
}

export const createProduct = async (req: Request, res: Response) => {
  const product = await Product.create(req.body)
  res.status(201).json({ data: product })
}

export const updateProduct = async (req: Request, res: Response) => {
  //Comprobación del producto si existe
  const { id } = req.params
  const product = await Product.findByPk(id)
  if (!product) {
    res.status(404).json({ error: "Producto no encontrado" })
    return
  }
  res.json({ data: product })

  //Actualizar
  await product.update(req.body)
  await product.save()
}

export const updateAvailability = async (req: Request, res: Response) => {
  //Comprobación del producto si existe
  const { id } = req.params
  const product = await Product.findByPk(id)
  if (!product) {
    res.status(404).json({ error: "Producto no encontrado" })
    return
  }

  //Actualizar
  product.availability = !product.dataValues.availability
  await product.save()
  res.json({ data: product })
}

export const deleteProduct = async (req: Request, res: Response) => {
  //Comprobación del producto si existe
  const { id } = req.params
  const product = await Product.findByPk(id)
  if (!product) {
    res.status(404).json({ error: "Producto no encontrado" })
    return
  }

  await product.destroy()
  res.json({ data: "Producto Eliminado..." })
}
