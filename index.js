const config = require('./utils/config')
const logger = require('./utils/logger')
const connectToDatabase = require('./utils/database')
const app = require('./app')

const startServer = async () => {
  try {
    await connectToDatabase(config.MONGODB_URI)
    logger.info('Connected to MongoDB')

    app.listen(config.PORT, () => {
      logger.info(`Server running on port ${config.PORT}`)
    })
  } catch (error) {
    logger.error('Unable to start server:', error.message)
    process.exitCode = 1
  }
}

void startServer()