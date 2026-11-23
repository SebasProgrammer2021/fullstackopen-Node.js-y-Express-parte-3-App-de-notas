const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Note = require('../models/note')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false
  },
  {
    content: 'Browser can execute only Javascript',
    important: true
  }
]

// sirve para hacer peticiones HTTP a la app de express, usa supertest para simular peticiones HTTP a la aplicación de Express. Esto permite probar los endpoints de la API sin necesidad de iniciar un servidor real.
const api = supertest(app)

beforeEach(async ()=>{
  await Note.deleteMany({})
  let noteObject = new Note(initialNotes[0])
  await noteObject.save()
  noteObject = new Note(initialNotes[1])
  await noteObject.save()
})

test.only('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test.only('there are two notes', async () => {
  const response = await api.get('/api/notes')

  assert.strictEqual(response.body.length, initialNotes.length)
})

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map(e => e.content)

  assert(contents.includes('HTML is easy'))
})


// cierra la conexión a la base de datos después de que todas las pruebas hayan terminado. Esto es importante para liberar recursos y evitar que el proceso de prueba se quede colgado debido a conexiones abiertas.
after(async () => {
  await mongoose.connection.close()
})