import { config } from 'dotenv'
import path from 'path'

config({ path: path.join(process.cwd(), '.env') })

export default {
  port: process.env.PORT,
  db_uri: process.env.DATABASE_URL,
}
