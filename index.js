const express = require("express");
const app = express();
const mongoose = require("mongoose");
const http = require("http").createServer(app);
const cors = require("cors");
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB_URI;

const UsrController = require('./controllers/controller.user');
const ChrController = require('./controllers/controller.character');
const AuthController = require('./controllers/controller.auth');
const Middleware = require('./middleware/auth-middleware.js');

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log("errrorrrrr"+err));


app.use(cors());
app.use(express.json());

/*
app.get("/", (req, res) => {
  //res.send("Hola estoy funcionando.");
  res.status(200).json("Hola estoy funcionando.");
});

// GET - POST - DELETE - PUT - PATCH 

app.post("/",(req,res) => {
    res.send("Llamada post");
});*/

// Get de todos los usuarios
/*app.get("/users",Middleware.verify,async (req,res) =>{

  let limit = req.query.limit;
  let offset = req.query.offset;

  try{
      const results = await UsrController.getAllUsers(limit,offset);
      res.status(200).json(results);

  }catch(error){
      res.status(500).send("Error. Intente más tarde.")
  }

});*/

// Crear usuario
app.post("/account",async (req,res) =>{
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let isActive = req.body.isActive;
  try{
    const result = await UsrController.addUser(email, name, password, isActive);
    if(result){
      res.status(201).send("Usuario creado correctamente"); // 201
    }else{
      res.status(409).send("El usuario ya existe"); // 409
    }  
  }catch(error){
    res.status(500).send("Error al crear el usuario.: " + error); //500
  }  
});

// Obtener usuario
app.get("/account/:id",async (req,res) =>{
    let userId =  req.params.id;
    try{
      user = await UsrController.getUser(userId);
      res.status(200).json(user);
    }catch(error){
      res.status(500).send("Error al obtener al usuario: " + error);
    }
});

// Modificar usuario
app.put("/account/:id",async (req,res) =>{
    const user = { _id: req.params.id, ...req.body };
    //             {_id: req.params.id, name: req.body.name, lastname, email }
    try{
      
      const result = await UsrController.editUser(user);
      if(result){
        res.status(200).json(result);
      }else{
        res.status(404).send("El usuario no existe.");
      }  
    }catch(error){  
       res.status(500).send("Error al modificar el usuario: " + error);
    } 
});

// Eliminar usuario
app.delete("/account/:id", async(req,res) =>{
    try{
      const result = await UsrController.deleteUser(req.params.id);
      if(result){
        res.status(200).send("Usuario borrado.")
      }else{
        res.status(404).send("No se ha podido eliminar el usuario.")
      }  
    }catch(error){
      res.status(500).send("Error al eliminar usario: " + error)
    }
});

//login authentication
app.post("/auth/login", async (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    try{
      const result = await AuthController.login(email,password);
      if(result){
        res.status(200).json(result);
      }else{
        res.status(401).send("No puede estar aqui")
      }
    }catch(error){
        res.status(500).send("Error: " + error);
    }  
})

// Crear personaje
app.post("/dashboard", Middleware.verify, async (req,res) =>{
  let user_id = req.user.userId;
  let upper = req.body.upper;
  let lower = req.body.lower;
  let shoes = req.body.shoes;
  console.log(user_id);
  try{
    const result = await ChrController.addCharacter(user_id, upper, lower, shoes);
    if(result){
      res.status(201).send("Personaje creado correctamente"); // 201
    }
  }catch(error){
    res.status(500).send("Error al crear el personaje." + error); //500
  }  
});

//Obtener personaje usuario
app.get("/dashboard/:user_id",async (req,res) =>{
  let charactersByUser =  req.params.user_id;
  try{
    const character = await ChrController.getUserCharacters(charactersByUser);
    res.status(200).json(character);
  }catch(error){
    res.status(500).send("Error al obtener el personaje: " + error);
  }
});

// Obtener todos los personaje mostrando los ultimos creados al principio
app.get("/dashboard/:limit/:offset", async (req,res) =>{
  let limit = req.query.limit;
  try{
      const results = await ChrController.getAllCharacters();
      res.status(200).json(results);

  }catch(error){
      res.status(500).send("Error al obtener los personajes: " + error)
  }
});

// Modificar personaje
app.put("/account/:id",async (req,res) =>{
  const user = { _id: req.params.id, ...req.body };
  try{
    const result = await ChrController.editCharacter(user);
    if(result){
      res.status(200).json(result);
    }else{
      res.status(404).send("El personaje no existe.");
    }  
  }catch(error){  
     res.status(500).send("Error al modificar al personaje: " + error);
  } 
});

// Eliminar personaje
app.delete("/account/:id", async(req,res) =>{
  try{
    const result = await ChrController.deleteCharacter(req.params.id);
    if(result){
      res.status(200).send("Personaje borrado.")
    }else{
      res.status(404).send("No se ha podido eliminar el personaje.")
    }  
  }catch(error){
    res.status(500).send("Error al eliminar el personaje: " + error)
  }
});

http.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
