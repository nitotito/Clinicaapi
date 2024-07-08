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


/* function crearJson(usuario){
   var salida= {data: usuario,
    token :jwt.sign({
        
        data:usuario,
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        
    },"superclave")}
    return salida;
    

} */
