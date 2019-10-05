import model from '../models';
const fetch = require('node-fetch');

const { especialidad_doctor } = model

const{ Especialidades } = model

class Doctor_consulta{
    static reg_doctor_especialidad(req,res){
        if( req.body.nombre_doctor == "" || req.body.ci == "" || isNaN(req.body.ci)){
            if(req.body.nombre_doctor == ""){
                res.status(400).json({
                    success: false,
                    msg: "Inserte nombre del doctor"
                })
            }else if(req.body.ci == "") {
                res.status(400).json({
                    success: false,
                    msg: "Inserte C.I del doctor"
                })
            }else if (isNaN(req.body.ci)){
                res.status(400).json({
                    success: false,
                    msg: "C.I solo puede contener numeros"
                })
            }
        }else{
            //const { req. }
            fetch('http://localhost:3600/api/get_medico_ci/'+req.body.ci)
            .then(resp => resp.json())
            .catch(error => console.error('Error',error))
            .then(data_login => {
                if(data_login == ""){
                    res.status(400).json({
                        success:false,
                        msg:"C.I. no existe"
                    })
                }else{
                    if (data_login[0].cargo != "medico" ){
                        res.status(400).json({
                            success:false,
                            msg:"El Personal que quiere registrar no cumple con los requisitos"
                        }) 
                    }else{
                        especialidad_doctor.findAll({
                            where: { ci : req.body.ci, id_especialidad : req.params.id_especialidad }
                             //attributes: ['id', ['description', 'descripcion']]
                        }).then((data) => {
                          if(data == ""){
                            especialidad_doctor.findAll({
                                where:{ ci : req.body.ci }
                            })
                            .then((data) => {
                                if(data.length >= 1){
                                    res.status(400).json({
                                        success:false,
                                        msg:" Ese doctor ya esta registrado en otra especialidad "
                                    })
                                }else{
                                    const { nombre_doctor,ci } = req.body
                                    var id_medico = data_login[0].id
                                    const { id_especialidad } = req.params
                                    return especialidad_doctor
                                    .create({
                                        nombre_doctor,
                                        ci,
                                        id_medico,
                                        id_especialidad
                                    })
                                    .then(serviceData => res.status(200).send ({
                                        success: true,
                                        msg: 'successfully created',
                                        serviceData
                                    }))
                                }
                            }); 
                            
                          }else{
                              res.status(400).json({
                                  success: false,
                                  msg:"El medico ya esta registrado en la especialidad"
                              })
                          }

                        }); 
                       
                    }
                }
            })
            .catch(error => {
                res.status(500).json({
                    success:false,
                    msg:"algo paso con el servidor, o no se esta pudiendo acceder a la ruta",
                    error
                })
            })
        }
    }
    static list_doctores_especialidad(req, res){                
        especialidad_doctor.findAll()
        .then((data) => {
          res.status(200).json(data);
        });     
    }
    static only_list_doctores_especialidad(req, res){                
        especialidad_doctor.findAll({
            where:{ id_especialidad : req.params.id_especialidad  }
        })
        .then((data) => {
          res.status(200).json(data);
        });     
    }

    //esta ruta es para saber que doctor pertenece a que area
    static doctor_area(req, res){                
        especialidad_doctor.findAll({
            where:{ id_medico : req.params.id_medico  },
            include:[
                { model : Especialidades }
            ]
            
        })
        .then((data) => {
          res.status(200).json(data);
        });     
    }
}

export default Doctor_consulta;

