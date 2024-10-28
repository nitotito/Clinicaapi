var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10, // Limita el número de conexiones en el pool
    host: 'mysql.db.mdbgo.com',
    user: 'nitotito_clinica',
    password: '2008Lopeznicolas.',
    database: 'nitotito_clnica',
    port: 3306
});



// Función para buscar personas
exports.buscarPersonas = function(respuesta) {
    pool.query("SELECT * FROM Usuario", function(err, resultado) {
        if (err) {
            console.error('Error al buscar personas:', err);
            return respuesta(null); // O manejar el error como prefieras
        }
        console.log('Consulta exitosa:', resultado);
        respuesta(resultado);
    });
}

// Función para insertar persona (Paciente)
exports.insertarPersona = function(usuario, retornar) {
    const { nombre, apellido, email, telefono, contra, dni, credencial } = usuario;

    // Validar campos requeridos
    if (!dni) {
        return retornar(400); // o un mensaje más específico
    }

    const query = 'SELECT * FROM Paciente WHERE dni = ?';

    pool.query(query, [dni], (err, results) => {
        if (err) {
            console.error('Error en la base de datos:', err);
            return retornar(500);
        }

        if (results.length > 0) {
            console.log(`Usuario existente. DNI encontrado en la BD.`);
            return retornar(400);
        }

        var sql = "INSERT INTO Paciente (nombre, apellido, email, telefono, contra, dni, credencial) VALUES (?, ?, ?, ?, ?, ?, ?)";
        pool.query(sql, [nombre, apellido, email, telefono, contra, dni, credencial], function(err) {
            if (err) {
                console.error('Error al insertar paciente:', err);
                return retornar(500);
            }
            console.log("Paciente insertado exitosamente");
            retornar("ok");
        });
    });
}

// Función para insertar persona (Medico)
exports.insertarPersonaMed = function(usuario, retornar) {
    const { nombre, apellido, email, telefono, contra, dni, especialidad, matricula } = usuario;

    // Validar campos requeridos
    if (!dni) {
        return retornar(400); // o un mensaje más específico
    }

    const query = 'SELECT * FROM Medico WHERE dni = ?';

    pool.query(query, [dni], (err, results) => {
        if (err) {
            console.error('Error en la base de datos:', err);
            return retornar(500);
        }

        if (results.length > 0) {
            console.log(`Usuario existente. DNI encontrado en la BD.`);
            return retornar(400);
        }

        var sql = "INSERT INTO Medico (dni, nombre, apellido, email, telefono, contra, especialidad, matricula, habilitacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'false')";
        pool.query(sql, [dni, nombre, apellido, email, telefono, contra, especialidad, matricula], function(err) {
            if (err) {
                console.error('Error al insertar médico:', err);
                return retornar(500);
            }
            console.log("Médico insertado exitosamente");
            retornar("okmedico");
        });
    });
}

// Función para insertar persona (Admin)
exports.insertarPersonaAdmin = function(usuario, retornar) {
    const { nombre, apellido, email, contra, dni } = usuario;

    // Validar campos requeridos
    if (!dni) {
        return retornar(400); // o un mensaje más específico
    }

    const query = 'SELECT * FROM Admin WHERE dni = ?';

    pool.query(query, [dni], (err, results) => {
        if (err) {
            console.error('Error en la base de datos:', err);
            return retornar(500);
        }

        if (results.length != 0) {
            console.log(`Admin existente en la BD`);
            return retornar(300);
        }

        var sql = "INSERT INTO Admin (nombre, apellido, email, contra, dni) VALUES (?, ?, ?, ?, ?)";
        pool.query(sql, [nombre, apellido, email, contra, dni], function(err) {
            if (err) {
                console.error('Error al insertar admin:', err);
                return retornar(500);
            }
            console.log("Admin insertado exitosamente");
            retornar("okadmin");
        });
    });
}

// Función para el login de usuario
exports.loginUsuario = function(usuario, retornar) {
    const tipoDeUsuario = usuario.tipoUsuario;
    let sql = "";

    switch(tipoDeUsuario) {
        case "Paciente":
            sql = "SELECT id, dni, contra, nombre FROM Paciente WHERE DNI = ? AND contra = ?";
            break;
        case "medico":
            sql = "SELECT id , dni, contra, habilitacion, nombre FROM Medico WHERE DNI = ? AND contra = ?";
            break;
        case "admin":
            sql = "SELECT * FROM Admin WHERE DNI = ? AND contra = ?";
            break;
        default:
            console.error('Tipo de usuario no reconocido:', tipoDeUsuario);
            return retornar(null);
    }

    pool.query(sql, [usuario.dni, usuario.contra], function(err, resultado) {
        if (err) {
            console.error('Error al hacer login:', err);
            return retornar(null);
        }
        console.log("Resultado de la consulta:", JSON.stringify(resultado));
        retornar(resultado);
    });
}

// Función para obtener médicos
exports.getMedico = function(req,respuesta) {
    const query = 'SELECT * FROM Medico';
    
    pool.query(query, function(err, resultado) {
        if (err) {
            console.error('Error al obtener médicos:', err);
            return respuesta(null);
        }
        console.log("Médicos obtenidos:", resultado);
        respuesta(resultado);
    });
}

// Función para actualizar estado de médico
exports.updatedMedicoState = function(usuario, retorno) {
    const habilitacionEstado = usuario.habilitacion === "false" ? 'true' : 'false';
    const queryTo = "UPDATE Medico SET habilitacion = ? WHERE dni = ?";

    pool.query(queryTo, [habilitacionEstado, usuario.dni], function(err, resultado) {
        if (err) {
            console.error('Error al actualizar estado del médico:', err);
            return retorno(null);
        }
        console.log("Estado del médico actualizado:", resultado);
        retorno(resultado);
    });
}

exports.getMedicoEspecialidad = function (req, retornar) {
    const query = `SELECT * FROM Medicos WHERE especialidad = '${req.especialidad}' AND estado = 'habilitado'`;
    pool.query(query, function(err, resultado) {
        if (err) {
            console.error('Error al obtener médicos:', err);
            return retornar(null);
        }
        console.log("Especialidad de medicos : ", resultado);
        retornar(resultado);
    });
}
//REVISAR. FALTA COMPLETAR
exports.getTurnosMedicos = function (req, retornar) {
    const idMedico = req.id_medico;
    const query = `SELECT * FROM Turno WHERE id_medico = ?`;
    pool.query(query,[idMedico], function(err, resultado) {
        if (err) {
            console.error('Error al obtener médicos:', err);
            return retornar(null);
        }
        console.log("Turnos obtenidos:", resultado);
        retornar(resultado);
    });
}

exports.getDisponibilidadporEspecialidad = function (req, retornar) {
    const especialidad = req.especialidad; 
    const query = `SELECT * FROM Disponibilidad WHERE especialidad = ?`;
    console.log("Consulta a ejecutar:", query, "con especialidad:", especialidad);

    pool.query(query,[especialidad], function(err, resultado) {
        if (err) {
            console.error('Error al obtener disponibilidad:', err);
            return retornar(null);
        }
        console.log("Disponibilidad encontrada:", resultado);
        retornar(resultado);
    });
}

exports.postGuardarTurno = function (req, res) {
    const { id_paciente, id_medico, especialidad, fecha, hora } = req;
    // Verifica que los datos no sean nulos
    if (!id_paciente || !id_medico || !especialidad || !fecha || !hora) {
        return res.status(400).json({ success: false, message: 'Datos incompletos' });
    }

    const observaciones = "no aplica";
    const estado = "confirmado";
    const calificacion = "a confirmar";

    // Modifica 'dia' a 'fecha' para que coincida con la estructura de tu base de datos
    const query = `INSERT INTO Turno (id_paciente, id_medico, especialidad, dia, hora, observaciones, estado, calificacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    console.log("query : ", query);
    pool.query(query, [id_paciente, id_medico, especialidad, fecha, hora, observaciones, estado, calificacion], ( results) => {
        res(results);
    });
};

exports.getTurnosTomados = function (req, res) {
    console.log("entrante : ", req);
    const {medicoId,dia} = req;

    const query = `
        SELECT hora 
        FROM Turno 
        WHERE id_medico = ? 
        AND dia = ?
    `;

    console.log("datos entrantes : ", medicoId + "  " + dia);
    pool.query(query,[medicoId, dia], (err, resultado) => {
        if (err) {
            console.error('Error al obtener disponibilidad:', err);
            return res(null);
        }
        console.log("Consulta a ejecutar:", query);
        console.log("horarios encontrados:", resultado);
        return res(resultado);
    });
}

exports.getHistorialTurnos = function (req, retornar) {
    const { id_paciente, opcion} = req;

    console.log("id paciente: ", id_paciente)
    console.log("opcion: " + opcion);

    if(opcion == 1){
        const query = `SELECT * FROM Turno WHERE id_paciente = ?`;
        pool.query(query,[id_paciente], function(err, resultado) {
            if (err) {
                console.error('Error al obtener turnos:', err);
                return retornar(null);
            }
            console.log("Turnos obtenidos:", resultado);
            retornar(resultado);
        });
    }else if( opcion == 2){
        const query = `SELECT * FROM Turno WHERE id_paciente = ? AND estado = "confirmado"`;
        pool.query(query,[id_paciente], function(err, resultado) {
            if (err) {
                console.error('Error al obtener turnos:', err);
                return retornar(null);
            }
            console.log("Turnos obtenidos:", resultado);
            retornar(resultado);
        });
    }

}

exports.sendCalificacion = function ( req , res){
    const { calificacion, id } = req;
    console.log(" desde bd : ", calificacion);
    console.log(" desde bd : ", id);
    const query = `UPDATE Turno SET calificacion = ? WHERE id = ?`;

    pool.query(query,[calificacion,id], function(err, resultado) {
        if (err) {
            console.error('Error al obtener turnos:', err);
            return res(null);
        }
        res(resultado);
    });
}

exports.getCalificaionesXidPaciente = function ( req , res ){
    const id_paciente = req;
    const query = `SELECT T.*,M.nombre, M.apellido FROM Turno as T INNER JOIN Medico AS M ON M.id = T.id_medico WHERE id_paciente = ? AND calificacion <> 'a confirmar'`;
    console.log("req que entra : ", req);
    console.log("Consulta SQL:", query, " - Parámetro:", id_paciente);

    pool.query(query,[id_paciente], function(err, resultado) {
        if (err) {
            console.error('Error al obtener turnos:', err);
            return res(null);
        }
        res(resultado);
    });

}

exports.getTurnosTomadosCSV = function (req, retornar) {
    const query = `SELECT T.*, 
        CONCAT(A.nombre, ' ', A.apellido) AS Paciente, 
        A.dni AS 'DNI_paciente', 
        CONCAT(M.nombre, ' ', M.apellido) AS Medico
        FROM Turno T 
        INNER JOIN Paciente A ON A.id = T.id_paciente
        INNER JOIN Medico M ON M.id = T.id_medico
        WHERE T.id = '${req}'`;
        console.log("req obtenida", req);
        console.log("consulta: ", query);            
        pool.query(query, function(err, resultado) {
            if (err) {
                console.error('Error al obtener turnos:', err);
                return retornar(null);
            }
            retornar(resultado);
        });
    
}

exports.getBuscarMedicoId = function ( req , res ){
    console.log("req ", req);
    const id = req.id_medico;
    const query = `SELECT * FROM Medico WHERE dni = ? `  ;
    

    pool.query(query,[id], function(err, resultado) {
        if (err) {
            console.error('Error al obtener turnos:', err);
            return res(null);
        }
        console.log("resultado : " , resultado);
        res(resultado);
    });

}

exports.postGuardarDisponibilidad = function (disponibilidad, callback) {
    console.log("Disponibilidad recibida para guardar: ", disponibilidad);

    const { id_medico, especialidad, desde, hasta, dias } = disponibilidad;

   

    // Verificar si 'dias' es un array antes de convertirlo en una cadena separada por comas
    const diasFormatted = Array.isArray(dias) ? dias.join(',') : dias;

    const query = `INSERT INTO Disponibilidad (id_medico, especialidad, desde, hasta, dias) VALUES (?, ?, ?, ?, ?)`;

    console.log("Query a ejecutar: ", query);

    pool.query(query, [id_medico, especialidad, desde, hasta, diasFormatted], (error, results) => {
        if (error) {
            console.error("Error al insertar disponibilidad:", error);
            return callback(error);  // Llamar callback con error
        }
        console.log("Disponibilidad guardada exitosamente:", results);
        callback(null, results);  // Llamar callback con los resultados
    });

    
};

exports.putUpdateTurno = function ( req , res ){
    console.log("req ", req);
    const {id,option}= req;
    const query = `UPDATE Turno SET estado = ? WHERE id = ? `;
    

    pool.query(query,[option,id], function(err, resultado) {
        if (err) {
            console.error('Error al obtener turnos:', err);
            return res(null);
        }
        res(resultado);
    });

}

exports.getPacienteId = function ( req , res ){
    const {id}= req;
    const query = `SELECT * FROM Paciente WHERE id = ? `;
    
    console.log("id type : ", id);
    console.log("id type : ", typeof(id));
    pool.query(query,[id], function(err, resultado) {
        console.log("despues de la query:", resultado);
        if (err) {
            console.error('Error al obtener turnos:', err);
            return res(null);
        }
        res(resultado[0]);
    });

}

exports.putUdatePaciente = function ( req , res ){
    console.log("id type : ", req.body);
    console.log("askjdfkjaksjdf",req.params);
    const {id}= req.params;
    const{nombre,apellido,email,telefono,contra,dni,credencial,avatar} = req.body;
    const query = `
        UPDATE Paciente 
        SET nombre = ?, apellido = ?, email = ?, telefono = ?, contra = ?, dni = ?, credencial = ?, avatar = ?
        WHERE id = ?
    `;
    
    pool.query(query,[nombre,apellido,email,telefono,contra,dni,credencial,avatar,id], function(err, resultado) {
        console.log("despues de la query:", resultado);
        if (err) {
            console.info('Error al obtener turnos:', err);
            return res(err);
        }
        return res( resultado);
    });

}