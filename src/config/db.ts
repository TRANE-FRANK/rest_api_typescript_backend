import { Sequelize } from "sequelize-typescript"
import dotenv from "dotenv"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

dotenv.config()


//const __filename = fileURLToPath(import.meta.url)
//const __dirname = dirname(__filename)



const db = new Sequelize(process.env.DATABASE_URL!, {
  models: [__dirname + "/../models/**/*"],
  logging: false
})

export default db
