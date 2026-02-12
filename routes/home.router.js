import { Router } from "express";

const router = Router();

router.get('/', (req, res)=>{
    res.status(200).json({message: "Hola a todos"})
})

export default router; //exporto con minusculas porque NO ESTOY EXPORTANDO la funcion de express, estoy exportando mi instancia (const) creada.