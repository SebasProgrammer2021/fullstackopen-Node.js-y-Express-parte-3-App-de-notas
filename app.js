const express = require('express')
const cors = require('cors')
const app = express()
const notesRouter = require('./controllers/notes')
const unknownEndpoint = require('./middlewares/unknownEndpoint')
const errorHandler = require('./middlewares/errorHandler')
const requestLogger = require('./middlewares/requestLogger')

app.use(express.json())
app.use(cors())
app.use(requestLogger)

app.get('/', (request, response) => {
	response.send('<h1>Hello World!</h1>')
})

app.use('/api/notes', notesRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app