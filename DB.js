var mysql =  require('mysql');

// var conexion =  mysql.createConnection({
//     host: 'sql10.freemysqlhosting.net',
//     user: 'sql10704560',
//     password: 'Lf6vP2c1Up',
//     database: 'sql10704560'
//     });

    var conexion =  mysql.createConnection({
    host: 'mysql.db.mdbgo.com',
    user: 'nitotito_clinica',
    password: '2008Lopeznicolas.',
    database: 'nitotito_clnica',
    port: 3306
    });


function conectar(){

    conexion.connect(function(err){
        if(err) console.log(err);
        else{
            console.log("conexion exitosa");
        }
    })
}


exports.buscarPersonas = function(respuesta){
    conectar();
    conexion.query("select * from Usuario", 
    function(err, resultado, filas){
        if(err) throw err;
        console.log('estoy antes que hola');

     //   console.log(resultado);
        respuesta(resultado);

    } );
    console.log('hola');
}


exports.insertarPersona = function(usuario, retornar){  
    var status; 
    conectar();
//nuevo
const{nombre,apellido,email,telefono,contra,dni,credencial} = usuario;
console.log("destructurar body con dni : " + dni);
const query = 'SELECT * FROM Paciente WHERE dni = ?';
conexion.query(query, [dni], (err, results) => {
    if (err) {
        status = 500;
        console.log('Error en la base de datos.');

        retornar(status);

      }
      
      if (results.length > 0) {
       status = 400;
        console.log(`Usuario existente. Dni encontrado en bd`);

        retornar(status);

      }
//hast aca

if(status != 400 || status !=500){


    var sql = "insert into Paciente (nombre,apellido,email,telefono,contra,dni,credencial)";
    sql= sql + " values ('" + usuario.nombre + "',";
    sql= sql + "'" + usuario.apellido + "',";
    sql= sql + "'" + usuario.email + "',";
    sql= sql + "'" + usuario.telefono + "',";
    sql= sql + "'" + usuario.contra+ "',";
    sql= sql + "'" + usuario.dni + "',";
    sql= sql + "'" + usuario.credencial + "')";
 

    conexion.query(sql,
     function(err, resultado, filas){
        if(err) throw err;
        console.log(resultado);
        
        retornar("ok");
    });
  }
});//borrar este
}

exports.insertarPersonaMed = function(usuario, retornar){   
    var status; 
    conectar();
//nuevo
const{nombre,apellido,email,telefono,contra,dni,especialidad,matricula} = usuario;
console.log("destructurar body con dni : " + dni);
const query = 'SELECT * FROM Medico WHERE dni = ?';
conexion.query(query, [dni], (err, results) => {
    if (err) {
        status = 500;
        console.log('Error en la base de datos.');

        retornar(status);

      }
      
      if (results.length > 0) {
       status = 401;
        console.log(`Usuario existente. Dni encontrado en bd`);

        retornar(status);

      }
//hast aca
if(status != 400 /* || status !=500 */){
    var sql = "insert into Medico (dni,nombre,apellido,email,telefono,contra,especialidad,matricula)";
    sql= sql + " values ('" + usuario.dni + "',";
    sql= sql + "'" + usuario.nombre + "',";
    sql= sql + "'" + usuario.apellido + "',";
    sql= sql + "'" + usuario.email + "',";
    sql= sql + "'" + usuario.telefono + "',";
    sql= sql + "'" + usuario.contra+ "',";
    sql= sql + "'" + usuario.especialidad + "',";
    sql= sql + "'" + usuario.matricula + "')";
         

    conexion.query(sql,
     function(err, resultado, filas){
        if(err) throw err;
        console.log(resultado);
        
        retornar("okmedico");

        });
      }
    });
}

exports.insertarPersonaAdmin = function(usuario, retornar){   
    var status; 
    conectar();

    const{nombre,apellido,email,contra} = usuario;
    const query = 'SELECT * FROM Admin';
    conexion.query(query, (err, results) => {
    if (err) {
        status = 500;
        console.log('Error en la base de datos.');

        retornar(status);

      }
      
      if (results.length != 0) {
       status = 300;
        console.log(`Admin existente en la bd`);
        retornar(status);

      }

if(status != 300 ){
    var sql = "insert into Admin (nombre,apellido,email,contra)";
    sql= sql + " values ('" + usuario.nombre + "',";
    sql= sql + "'" + usuario.apellido + "',";
    sql= sql + "'" + usuario.email + "',";
    sql= sql + "'" + usuario.contra + "')";
 

    conexion.query(sql,
     function(err, resultado, filas){
        if(err) throw err;
        console.log(resultado);
        
        retornar("okadmin");
    });
  }
});//borrar este
}

    exports.loginUsuario = function(usuario, retornar){
        console.log("desde db : " + usuario.tipoUsuario);
        let tipoDeUsuario = usuario.tipoUsuario;
        conectar();

        switch(tipoDeUsuario){
            case "Paciente":
                console.log("consulta a pacientes");
                var sql = "SELECT dni,contra FROM  Paciente WHERE DNI = ";
                sql= sql + usuario.dni;
                sql=sql + " and contra = ";
                sql= sql + "'" + usuario.contra + "'";
                console.log("Consulta a realizar : " + sql);
                break;
            case "medico":
                console.log("consulta a medicos");
                var sql = "SELECT dni,contra FROM  Medico WHERE DNI = ";
                sql= sql + usuario.dni;
                sql=sql + " and contra = ";
                sql= sql + "'" + usuario.contra + "'";
                console.log("Consulta a realizar : " + sql);
                break;
            case "admin":
                console.log("consulta a admin");
                break;
        }
        
       
    
        conexion.query(sql,
         function(err, resultado, filas){
            if(err) throw err;
            console.log("resultado de query : " + JSON.stringify(resultado));
            retornar(resultado);
    
        });
    
}

