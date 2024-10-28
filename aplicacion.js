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
            res.json(datos);  
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
    
    db.postGuardarDisponibilidad(disponibilidad, (error, datos) => {
        if (error) {
            return callback(error);  
        }
        callback(null, datos);  
    });
};

exports.updateTurno = function(req, res) {
    
    db.putUpdateTurno(req, (error, datos) => {
        if (error) {
            return res(error);  
        }
        res(null, datos);  
    });
};

exports.pacienteById = function(req, res) {
    db.getPacienteId(req, ( datos) => {
        res.json(datos);  
    });
};

exports.pacienteById = function(req, res) {
    db.getPacienteId(req, ( datos) => {
        res.json(datos);  
    });
};

exports.updatePaciente = function(req, res) {
    db.putUdatePaciente(req, ( datos) => {
        console.log("ojo lean", res);
        res(datos);  
    });
};

