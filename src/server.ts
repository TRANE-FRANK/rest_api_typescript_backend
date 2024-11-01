import express from "express"
import router from "./router"
import cors, { CorsOptions } from "cors"
import morgan from "morgan"
import swaggerUI from "swagger-ui-express"
import swaggerSpec from "./config/swagger"
import db from "./config/db"
import colors from "colors"

//sadasd

//Conexion a Base de Datos
export async function connectDB() {
  try {
    await db.authenticate()
    db.sync()
    //console.log(colors.cyan.bold("CONECTADO A LA BASE DE DATOS"))
  } catch (error) {
    //console.log(error)
    console.log(colors.red.bold("ERROR AL CONECTAR A LA BASE DE DATOS"))
  }
}

connectDB()

//Instancia de Express
const server = express()

//Configurar CORS para permitir conexiones
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true)
    } else {
      callback(new Error("Error de CORS"))
    }
  },
}
server.use(cors(corsOptions))

//Leer datos de formulario
server.use(express.json())

server.use(morgan("dev"))

//Configuracion del servidor de rutas
server.use("/api/products", router)

//DOCS
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec))

export default server
