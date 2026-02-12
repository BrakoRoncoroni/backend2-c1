import mongoose from "mongoose";

export const connectMongoDB = async ()=>{
    try {
    await mongoose.connect('mongodb://127.0.0.1:27017/clase1'); //esto lo escribo yo, el acceso suele ser el mismo siempre (127.0.0.1 es lo mismo que poner "localhost", pero mongo a veces da error si uso ese termino. Por eso, es preferible poner el acceso directo), y el puerto por defecto es el 27017, y luego le pongo el nombre de la base de datos (en este caso, se creara una base de datos nueva)
    console.log("Conectado con exito a MongoDB ✅") 
} catch (error) {
    console.error("Error al conectarse a MongoDB: ", error)
    process.exit(1);
}
}


export const connectMongoAtlasDB = async ()=>{
    try {
    await mongoose.connect('mongodb+srv://kobradevelopment_db:2EUi8MKbNWY6LJIN@kobradb.6bnp6rg.mongodb.net/?appName=KobraDB');
    console.log("Conectado con exito a Mongo Atlas ✅")
} catch (error) {
    console.error("Error al conectarse a Atlas: ", error)
    process.exit(1);
}
}
