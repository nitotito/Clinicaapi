var db = require('./DB');

exports.insertar = function (usuario, res) {

    db.insertarPersona(usuario, datos => { res.json(datos) });

}

exports.insertarMed = function (usuario, res) {

    db.insertarPersonaMed(usuario, datos => { res.json(datos) });

}

exports.insertarAdmin = function (usuario, res) {

    db.insertarPersonaAdmin(usuario, datos => { res.json(datos) });

}

exports.loguear = function (login, res) {

    console.log(" desde aplication : " + login.tipoUsuario);
    db.loginUsuario(login, datos => { res.json(datos)});

}

exports.getMedico = function (login, res) {

    db.getMedico(login, datos => { res.json(datos)});

}

exports.updatedMedico = function(usuario, res) {

    db.updatedMedicoState(usuario, datos => { res.json(datos)});
}

exports.DisponibilidadporEspecialidad = function (usuario, res) {
    db.getDisponibilidadporEspecialidad(usuario, datos => {
        if (datos) {
            res.json(datos);  // Enviar los datos de vuelta al cliente
        } else {
            res.status(404).json({ error: "Disponibilidad no encontrada" });
        }
    });
}

exports.getMedicoEspecialidad = function (usuario, res) {
    db.getMedicoEspecialidad(usuario, datos => {
        res.json(datos);
    });
}

exports.getTurnosMedicos = function (usuario, res) {
    db.getTurnosMedicos(usuario, datos => {
        res.json(datos);
    });
}

exports.guardarTurno = function(turno, res) {
    // Llama a la función para guardar el turno en la base de datos
    db.postGuardarTurno(turno, (datos) => {
        res.json(datos);
    });
};

exports.getTurnosMedicos = function(req, res) {
    db.getTurnosTomados(req, (datos) => {
    res.json( datos );
    });
};

exports.historialTurnos = function(req, res) {
    console.log("desde controlador : " , req);
    db.getHistorialTurnos(req, (datos) => {
    res.json( datos );
    });
};

exports.enviarCalificacion = function(req, res) {
    console.log("desde controlador : " , req);
    db.sendCalificacion(req, (datos) => {
    res.json( datos );
    });
};

exports.getCalificaciones = function(req, res) {
    console.log("desde controlador : " , req);
    db.getCalificaionesXidPaciente(req, (datos) => {
    res.json( datos );
    });
};

exports.getTurnosTomadosCSV = function (usuario, res) {
    db.getTurnosTomadosCSV(usuario, datos => {
        res.json(datos);
    });
}

exports.medicosById = function (usuario, res) {

    db.getBuscarMedicoId(usuario, datos => { res.json(datos) });

}

exports.postGuardarDisponibilidad = function(disponibilidad, callback) {
    // Llama a la función de la base de datos para guardar la disponibilidad
    db.postGuardarDisponibilidad(disponibilidad, (error, datos) => {
        if (error) {
            return callback(error);  // Llamar callback con error si ocurre
        }
        callback(null, datos);  // Llamar callback con los datos si todo fue exitoso
    });
};

exports.updateTurno = function(req, res) {
    // Llama a la función de la base de datos para guardar la disponibilidad
    db.putUpdateTurno(req, (error, datos) => {
        if (error) {
            return res(error);  // Llamar callback con error si ocurre
        }
        res(null, datos);  // Llamar callback con los datos si todo fue exitoso
    });
};

/* function crearJson(usuario){
   var salida= {data: usuario,
    token :jwt.sign({
        
        data:usuario,
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        
    },"superclave")}
    return salida;
    

} */
