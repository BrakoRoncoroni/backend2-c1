import express from 'express';
import homeRouter from './routes/home.router.js';
import studentRouter from './routes/student.router.js'
import logger from './middleware/logger.middleware.js'
import {connectMongoDB, connectMongoAtlasDB} from './config/db/connect.config.js';


const app = express()
const PORT = 8080
const ATLAS = false; //con esta variable voy a conectarme a una base de datos u otra. Si Atlas es true, se conecta a mongo Atlas; y, sino, a MongoDB

app.use(express.json());
app.use(logger);
app.use('/', homeRouter);
app.use('/student', studentRouter);

const startServer = async() =>{
  ATLAS ? connectMongoAtlasDB() : connectMongoDB(); //esto significa: "si Atlas es verdadero (por eso el "?""), te conectas a mongoAtlas. Sino, te conectas a MongoDB"
  app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`)
})
}
//creo una constante que me inice el servidor de manera asincrona porque yo estoy llamando aqui a "ATLAS ? ..." de forma sincronica, y mis funciones en config son asincronas. Para que no me genere error, espero que todo eso suceda, y luego ahi si va a levantarse el servidor.

await startServer();
