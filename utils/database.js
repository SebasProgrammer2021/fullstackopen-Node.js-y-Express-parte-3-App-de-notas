const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const connectToDatabase = async (mongodbUri) => {
  if (!mongodbUri) {
    throw new Error('MongoDB URI missing. Set MONGODB_URI in your environment or .env file.')
  }

  await mongoose.connect(mongodbUri, { family: 4 })
}

module.exports = connectToDatabase