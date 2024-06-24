var express = require('express');
var aplicacion = require('./aplicacion');
var cors = require('cors');
var app = express();
var jwt=require("jsonwebtoken");
app.use(express.json());
app.use(cors());

app.get('/prueba/', (req, res) => {
    
    res.send('hello worldddd');
    
});

app.post('/login/', (req, res) => {
    
    var usuario = req.body;
   console.log("datossssss : " + usuario.tipoUsuario);
   let tipoDeUsuario = usuario.tipoUsuario;
   switch(tipoDeUsuario){
    case "medico":
        console.log("Ingreso Medico");
        break;
    case "paciente":
        console.log("ingreso paciente");
        break;
    case "admin":
        console.log("ingreso admin");
        break;
   }
   aplicacion.loguear(usuario, res);
   
    
});


app.post('/insertar/', (req, res) => {  // registros de usuarios 
    
    var usuario = req.body;
    aplicacion.insertar(usuario, res);
    
});

app.post('/insertarMed/', (req, res) => {  // registros de usuarios 
    
    var usuario = req.body;
    aplicacion.insertarMed(usuario, res);
    
});

app.post('/insertarAdmin/', (req, res) => {  // registros de usuarios 
    
    var usuario = req.body;
    aplicacion.insertarAdmin(usuario, res);
    
});

/* app.post('/loguear/', (req, res) => {  /// log de usuario 
    
    var login = req.body;
    aplicacion.loguear(login, res); //paso la misma variable 
    
}); */

/* app.post('/probar/', (req, res) => {
    
    
    var token=req.headers.authorization;
    
    if ((!token) || token.indexOf("Bearer ") == -1) res.sendStatus(401);
    try {
        var usuario= jwt.verify(token.replace("Bearer ", ""), "superclave");
        res.json(JSON.stringify( usuario));
    } catch (error) {
         res.sendStatus(401);
    }
    
}); */


app.listen( process.env.PORT || 3000, () => {
    console.log('escuchando el puerto');
})