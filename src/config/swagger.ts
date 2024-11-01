import swaggerJSDoc from "swagger-jsdoc"
import { SwaggerUiOptions } from "swagger-ui-express"

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.2",
    tags: [
      {
        name: "Products",
        description: "API operations related to products",
      },
    ],
    info: {
      title: "REST API Node.js / Express / TypeScript",
      description: "API docs for products",
      version: "1.0.0",
    },
  },
  apis: ["./src/router.ts"],
}

const swaggerUiOptions: SwaggerUiOptions = {
  customSiteTitle: "Documentación REST API Node.js / Express / TypeScript",
}

const swaggerSpec = swaggerJSDoc(options)
export default swaggerSpec
