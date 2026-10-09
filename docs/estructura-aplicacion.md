# Estructura de la aplicación

- `app.js` configura Express y los middlewares, define la ruta raíz y monta el router de notas en `/api/notes`. Exporta la instancia `app` para poder reutilizarla en pruebas sin abrir un puerto.
- `controllers/notes.js` define las operaciones CRUD relativas al prefijo `/api/notes`.
- `index.js` carga `utils/config.js`, conecta con MongoDB mediante `utils/database.js` y solo después inicia el servidor HTTP en `config.PORT`.
- `utils/config.js` procesa `.env`; `utils/database.js` configura Mongoose y valida `MONGODB_URI`. Si la conexión falla o falta la URI, el servidor no empieza a escuchar.
- `models/note.js` define únicamente el esquema y el modelo. Importarlo desde `app.js` o una prueba no abre una conexión a la base de datos.

Los comandos `npm start` y `npm run dev` siguen usando `index.js` como punto de entrada. Para verificar sintaxis después de cambios:

```bash
node --check app.js
node --check index.js
```