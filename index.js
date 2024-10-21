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

app.get('/medicos/', (req, res) => {
    var usuario = req.body;
    aplicacion.getMedico(usuario,res);
    
});

app.put('/medicos/', (req, res) => {
    var usuario = req.body;

    aplicacion.updatedMedico(usuario,res)
  
    // Encuentra el médico a actualizar
/*     let medico = medicos.find(m => m.dni == dni);
    if (medico) {
      // Actualiza los datos del médico
      Object.assign(medico, updatedMedico);
      res.json(medico);
    } else {
      res.status(404).json({ message: 'Médico no encontrado' });
    } */
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


app.post('/insertar/', (req, res) => {   
    
    var usuario = req.body;
    aplicacion.insertar(usuario, res);
    
});

app.post('/insertarMed/', (req, res) => {   
    
    var usuario = req.body;
    aplicacion.insertarMed(usuario, res);
    
});

app.post('/insertarAdmin/', (req, res) => {  
    
    var usuario = req.body;
    aplicacion.insertarAdmin(usuario, res);
    
});

app.get('/disponibilidadPorEsp/:specialty', (req, res) => { 
    const med = req.params.specialty; // Ahora accede al parámetro de la URL
    console.log("especialidad", med);

    aplicacion.DisponibilidadporEspecialidad({ especialidad: med }, res);
});

 // Obtener médicos por especialidad
app.get('/medico/especialidad', (req, res) => {
    const medico = req.query; // Almacenas el objeto de consulta
    aplicacion.getMedicoEspecialidad(medico, res);
});

// Obtener turnos de médicos
app.get('/turnos/medicos', (req, res) => {
    const medicoTurnos = req.query; 
    aplicacion.getTurnosMedicos(medicoTurnos, res);
});

app.post('/guardarTurno', (req, res) => {  
    var turno = req.body;
    console.log("datos que vienen :", turno);
    aplicacion.guardarTurno(turno, res);
});

app.get('/turnosTomados', (req, res) => {
    const medicoTurnos = req.query; 
    console.log("datos que entran : ", medicoTurnos);
    aplicacion.getTurnosMedicos(medicoTurnos, res);
});

app.get('/historialTurnos/:id_paciente', (req, res) => { 
    const pac = req.params.id_paciente; 
    const option = req.query.opcion
    console.log("id_paciente", pac);

    aplicacion.historialTurnos({ id_paciente: pac , opcion: option}, res);
});

app.post('/enviarCalificacion',(req, res) => { 
    const calificacion = req.body; 
    console.log("calificacion", calificacion);
    aplicacion.enviarCalificacion( calificacion , res);
});

app.get('/calificaciones', (req, res) => {
    const id_paciente = req.query.id_paciente;    
    console.log("datos que entran : ", id_paciente);
    aplicacion.getCalificaciones(id_paciente, res);
});

app.get('/turnosTomadosCSV', (req, res) => {
    const medico = req.query; 
    console.log("TURNOS PARA CSV : ", medico);
    aplicacion.getTurnosTomadosCSV(medico.dni_medico, res);
});

app.get('/medicosById', (req, res) => {  //consulta mdeico en el back service 
    var med=req.query;
    
     aplicacion.medicosById(med,res);
    
 });

 app.post('/guardarDisponibilidad', (req, res) => {
    var disponibilidad = req.body;
    console.log("Datos que vienen del cliente: ", disponibilidad);
    
    aplicacion.postGuardarDisponibilidad(disponibilidad, (error, resultado) => {
        res.json({ message: 'Disponibilidad guardada exitosamente', resultado });
    });
});

app.put('/updateTurno', (req, res) => {
    var updateTurno = req.query;
    console.log("Datos que vienen del cliente: ", updateTurno);
    
    aplicacion.updateTurno(updateTurno, (error, resultado) => {
        res.json({ message: 'Disponibilidad guardada exitosamente', resultado });
    });
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