import express from "express"
import router from "./router"
import db from "./config/db"
import colors from "colors"

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

//Leer datos de formulario
server.use(express.json())

//Configuracion del servidor de rutas
server.use("/api/products", router)

server.get("/api", (req, res) => {
  res.json({msg: "Desde API"})
})


export default server
