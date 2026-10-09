const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', (request, response, next) => {
  Note.find({})
    .then(notes => {
      response.json(notes)
    })
    .catch(error => next(error))
})

notesRouter.get('/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).json({ message: 'Nota no encontrada', status: 404 })
      }
    })
    .catch(error => next(error))
})

notesRouter.post('/', (request, response, next) => {
  const body = request.body

  if (!body?.content) {
    return response.status(400).json({ error: 'Content missing' })
  }

  const note = new Note({
    content: body.content,
    important: Boolean(body.important)
  })

  note.save()
    .then(savedNote => {
      response.json(savedNote)
    })
    .catch(error => next(error))
})

notesRouter.delete('/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(deletedNote => {
      if (deletedNote) {
        response.status(204).end()
      } else {
        response.status(404).json({ message: 'Nota no encontrada', status: 404 })
      }
    })
    .catch(error => next(error))
})

notesRouter.put('/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

module.exports = notesRouter