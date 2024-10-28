import request from "supertest"
import server from "../../server"

describe("POST /api/products", () => {
  it("should display validation errors", async () => {
    const response = await request(server).post("/api/products").send({})
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("errors")
    expect(response.body.errors).toHaveLength(4)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(2)
  })

  it("should create a new product", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Product 1 - TEST",
      price: 100,
    })
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("data")

    expect(response.status).not.toBe(404)
    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty("error")
  })

  it("should validate that the price is greather than 0", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Monitor Curvo",
      price: 0,
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("errors")
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(2)
  })

  it("should validate that the price is a number and greather than 0", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Monitor Curvo",
      price: 0,
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("errors")
    expect(response.body.errors).toHaveLength(1)

    expect(response.status).not.toBe(404)
    expect(response.body.errors).not.toHaveLength(4)
  })
})

describe("GET /api/products", () => {
  it("should check id api/products url exists", async () => {
    const response = await request(server).get("/api/products")
    expect(response.status).not.toBe(404)
  })

  it("Get a JSON response with products", async () => {
    const response = await request(server).get("/api/products")
    expect(response.status).toBe(200)
    expect(response.headers["content-type"]).toMatch(/json/)
    expect(response.body).toHaveProperty("data")
    expect(response.body.data).toHaveLength(1)

    expect(response.status).not.toBe(404)
    expect(response.body).not.toHaveProperty("errors")
  })
})

describe("GET /api/products/:id", () => {
  it("Should return a 404 response for a non-existent products", async () => {
    const productId = 2000
    const response = await request(server).get(`/api/products/${productId}`)
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty("error")
    expect(response.body.error).toBe("Producto no encontrado")
  })

  it("should check a valid ID in the URL", async () => {
    const response = await request(server).get("/api/products/not-valid-url")
    expect(response.status).not.toBe(404)
    expect(response.body).toHaveProperty("errors")
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe("El id no es valido")
  })

  it("Get a JSON response for a single product", async () => {
    const response = await request(server).get("/api/products/1")
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("data")
  })
})

describe("PUT /api/products/:id", () => {
  it("should check a valid ID in the URL", async () => {
    const response = await request(server)
      .put("/api/products/not-valid-url")
      .send({
        name: "Monitor Curvo",
        availability: true,
        price: 300,
      })
    expect(response.status).not.toBe(404)
    expect(response.body).toHaveProperty("errors")
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe("El id no es valido")
  })

  it("should display validation error messages when updating a producto", async () => {
    const response = await request(server).put("/api/products/1").send({})

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("errors")
    expect(response.body.errors).toBeTruthy()
    expect(response.body.errors).toHaveLength(5)

    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty("data")
  })

  it("should validate that the price is greather than 0", async () => {
    const response = await request(server).put("/api/products/1").send({
      name: "Monitor Curvo",
      availability: true,
      price: 0,
    })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("errors")
    expect(response.body.errors).toBeTruthy()
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe("Precio no valido")

    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty("data")
  })

  it("should return a 404 resonse for a non-existent product", async () => {
    const productId = 2000
    const response = await request(server)
      .put(`/api/products/${productId}`)
      .send({
        name: "Monitor Curvo",
        availability: true,
        price: 300,
      })

    expect(response.status).toBe(404)
    expect(response.body.error).toBe("Producto no encontrado")

    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty("data")
  })

  it("should update an existing product with valid data", async () => {
    const response = await request(server).put("/api/products/1").send({
      name: "Monitor Curvo",
      availability: true,
      price: 300,
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("data")

    expect(response.status).not.toBe(400)
    expect(response.body).not.toHaveProperty("errors")
  })
})

describe("PATCH /api/products/:id", () => {
  it("should return a 404 response for a non-existent product", async () => {
    const productId = 2000
    const resonse = await request(server).patch(`/api/products/${productId}`)
    expect(resonse.status).toBe(404)
    expect(resonse.body.error).toBe("Producto no encontrado")

    expect(resonse.status).not.toBe(200)
    expect(resonse.body).not.toHaveProperty("data")
  })

  it("should update the product availability", async () =>{
    const resonse = await request(server).patch(`/api/products/1`)
    expect(resonse.status).toBe(200)
    expect(resonse.body).toHaveProperty("data")
    expect(resonse.body.data.availability).toBe(false)

    expect(resonse.status).not.toBe(400)
    expect(resonse.status).not.toBe(404)
    expect(resonse.body).not.toHaveProperty("error")
  })
})

describe("DELETE /api/products/:id", () => {
  it("should check a valid ID", async () => {
    const response = await request(server).delete("/api/products/not-valid-url")
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("errors")
    expect(response.body.errors[0].msg).toBe("El id no es valido")
  })

  it("should return a 404 response for a non-existent", async () => {
    const productId = 2000
    const resonse = await request(server).delete(`/api/products/${productId}`)
    expect(resonse.status).toBe(404)
    expect(resonse.body.error).toBe("Producto no encontrado")
    expect(resonse.status).not.toBe(200)
  })

  it("should delete a product", async () => {
    const resonse = await request(server).delete("/api/products/1")
    expect(resonse.status).toBe(200)
    expect(resonse.body.data).toBe("Producto Eliminado...")
    expect(resonse.status).not.toBe(404)
    expect(resonse.status).not.toBe(400)
  })
})
