import { Router } from "express";
import {Student} from '../config/models/student.model.js';
import mongoose from "mongoose";

const router = Router();

//-----------------metodo GET-----------------------------

//get todos los alumnos
router.get('/', async (req, res)=>{
    try {
        const students = await Student.find()
        res.status(200).json({"students": students});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

//get by ID
router.get('/:id', async (req, res)=>{
    try {
        //cuando envio el parametro ID en mongo, tengo que hacer una validacion para que el formato sea el correcto. Esto se copia y se pega las veces que necesite, no tiene mucha logica, es copiar esta linea y pegarla en los enrutadores.
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({error: "Formato de ID invalido"})
        }
        //ahora si, voy a crear la logica. 
        const student = await Student.findById(req.params.id);
        if(!student){
            return res.status(404).json({error: `estudiante ID:${req.params.id} no existe`});
        }
        res.status(200).json({"student": student});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

//-----------------metodo POST-----------------------------

//crear un alumno
router.post('/', async (req,res)=>{
        try {
            let {name, email, age} = req.body;
            if(!name || !email || !age){
                res.status(400).json({error: "Todos los datos son requeridos"});
            }; //de esta forma valido que todos los datos sean ingresados

            email = String(email).trim().toLowerCase(); //con esta linea, me encargo de que el email no tenga espacios, y se guarde todo en minusculas. Lo purifico
            const emailInUse = await Student.exists({email});
            if(emailInUse){
                res.status(400).json({error: `El email <${email}> ya se encuentra en uso. Utilice otro`});
            }

            //en esta instancia ya tengo todas la validaciones necesarias para verificar si puedo o no continuar con la creacion del usuario. Ahora, voy a generar una constante para que efectivamente se cree y luego se guarde en mi DB
            const student = new Student({name, email, age})
            await student.save()

            res.status(201).json({"message": "estudiante creado con exito", "student": student});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})



//-----------------metodo PUT-----------------------------
//actualizar por id (esto solo es una actualizacion generica ya que debo actualizar todos los datos para que funcionen. Debo crear codigo para que se actualice solo el campo que yo deseo actualizar)
router.put('/:id', async (req, res)=>{
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({error: "Formato de ID invalido"})
        }
        let {name, email, age} = req.body;
            if(!name || !email || !age){
                res.status(400).json({error: "Todos los datos son requeridos"});
            }; //de esta forma valido que todos los datos sean ingresados

            email = String(email).trim().toLowerCase(); //con esta linea, me encargo de que el email no tenga espacios, y se guarde todo en minusculas. Lo purifico
            const emailInUse = await Student.exists({email});
            if(emailInUse){
                res.status(400).json({error: `El email <${email}> ya se encuentra en uso. Utilice otro`});
            }
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            //con esta porcion de codigo me aseguro de que se va a mostrar el nuevo luego de actualizarse. Sino, se va a actualizar pero se va a seguir mostrando el viejo
        });
        if(!student){
            return res.status(404).json({error: `El estudiante ID:${req.params.id} no existe`});
        }
        res.status(200).json({"message": "Estudiante actualizado con exito", student: student});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})


//-----------------metodo DELETE-----------------------------
router.delete('/:id', async (req, res)=>{
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({error: "Formato de ID invalido"})
        }
        const student = await Student.findByIdAndDelete(req.params.id);
        if(!student){
            return res.status(404).json({error: `El estudiante ID:${req.params.id} no existe`});
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})




export default router;