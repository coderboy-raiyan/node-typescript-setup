import http from 'http'
import mongoose from 'mongoose'
import app from './app/app'
import config from './config'

const PORT = process.env.PORT || 5000

const server = http.createServer(app)

async function bootstrap() {
  try {
    await mongoose.connect(config.db_uri as string)
    console.log('DB connected successfully')
    server.listen(PORT, () => {
      console.log('listening to ' + PORT + ' ...')
    })
  } catch (error) {
    console.log(error)
  }
}

bootstrap()
