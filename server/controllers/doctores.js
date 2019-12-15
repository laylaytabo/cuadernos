import model from '../models';
import Cuaderno from './cuadernos';
const sequelize = require('sequelize');
const Op = sequelize.Op;
const{ Doctores } = model;
const{ Fechas } = model;
const{ Turnos } = model
const{ Especialidades } = model;

const { Cuadernos } = model;

const { Consulta_especilaida } = model
 const { horas_of_truno } = model

class Doctor{
    static regist(req, res){
        console.log(req.body, " z<<<<")
        if(!req.body.nombre || !req.body.TDoctor || !req.body.especialidad ){
            if(!req.body.nombre ){
                res.status(400).json({
                    success: false,
                    message: "Seleccione Médico"
                })
            }else if (!req.body.TDoctor){
                res.status(400).json({
                    success: false,
                    message: "Seleccione tipo de Médico"
                })
            }else if (!req.body.especialidad) {
                res.status(400).json({
                    success: false,
                    message: "Seleccione Consultorio Especialidad"
                })
            }
            
        }else{
            Consulta_especilaida.findAll({
                where: {nombre: req.body.especialidad}
            })
            .then((data) => {
                var id = data[0].id
                const{ nombre,TDoctor, enfermera} = req.body
                const { idCuaderno } = req.params
                var id_ConsultaEspecialidad = id;
                return Doctores
                .create({
                    nombre,
                    TDoctor,
                    enfermera,
                    idCuaderno,
                    id_ConsultaEspecialidad /// esta cosa llenar cuando se seleccione la especilaidad

                }).then(data => res.status(200).send({
                    success: true,
                    message: 'Datos Ingresados Correctamente.',
                    data
                }))
                .catch(error => {
                    console.log(error)
                    res.status(500).json({
                        success:false,
                        msg:"no se pudo insertar los datos",
                        error
                    })
                });
            })
            
        }
    }
    //mostrar toos los doctores
    static ListDoctores(req, res){
        return Doctores
        .findAll()
        .then(data => res.status(200).send(data))
        .catch(error => res.status(400).send(error));
    }
    //ruta para sacar doctor segun idCuaderno
    static list(req, res){
        var id = req.params.id;  
        Doctores.findAll({
            where: {idCuaderno: id},
            include:[
                {model:Consulta_especilaida, attributes:['nombre']}
            ]               
            }).then((data) => {
                res.status(200).json(data);
            }); 
    }
    //ruta para poder sacar doctor segun id 
    static listDoc(req, res){
        var id = req.params.id;  
        Doctores.findAll({
            where: {id: id},
            include:[
                {model:Consulta_especilaida, attributes:['nombre']}
            ]               
            }).then((data) => {
                res.status(200).json(data);
            }); 
    }

    //ruta para actualizar
    static modifyDoctCuaderno(req, res) {
        Consulta_especilaida.findAll({
            where: {nombre: req.body.especialidad}
        })
        .then((data) => {
            var id = data[0].id
            console.log(" <<<<<<<<<<<<<<<<<   ",id)
            const {nombre,TDoctor, enfermera } = req.body
            var id_ConsultaEspecialidad = id;
            return Doctores
              .findByPk(req.params.id)
              .then((data) => {
                data.update({
                    nombre: nombre || data.nombre,
                    TDoctor: TDoctor || data.TDoctor,
                    enfermera: enfermera || data.enfermera,
                    id_ConsultaEspecialidad:id_ConsultaEspecialidad || data.id_ConsultaEspecialidad
                })
                .then(update => {
                  res.status(200).send({
                    success: true,  
                    message: 'Asiganción actualizado',
                    data: {
                        nombre: nombre || update.nombre,
                        TDoctor: TDoctor || update.TDoctor,
                        enfermera: enfermera || update.enfermera,
                        id_ConsultaEspecialidad:id_ConsultaEspecialidad || update.id_ConsultaEspecialidad
                    }
                  })
                })
                .catch(error => {
                    console.log(error)
                    res.status(500).json({
                        success:false,
                        message:"No se pudo actualizar los datos"
                    })
                });
              })
                .catch(error => {
                  console.log(error)
                  res.status(500).json({
                    success:false,
                    message:"No se pudo actualizar los datos"
                })
              });
        })
      }

      //
    static doctorTurnos(req, res){
        var id = req.params.id;
        Doctores.findAll({
            where : { id : id },
          //attributes: [],
            include: [
                { model: Fechas, attributes: ['id'], 
                include:[
                    { model: Turnos,}                
            ]}]
        }).then(users => {
          res.status(200).send(users)
        })
    }

    static docAllData(req, res){
        var id = req.params.id;
        Doctores.findAll({
            where : { id : id },
          //attributes: [],
            include: [
                { model: Fechas, 
                include:[
                    { model: Turnos, 
                    include:[
                        {model: horas_of_truno}
                    ]}                
            ]}]
        }).then(users => {
          res.status(200).send(users)
        })
    }
    static filter_doctores(req, res) {
        const { fecha_inicio, fecha_final }  = req.body
        if(!fecha_final || !fecha_inicio){
            res.status(400).json({
                success:false,
                msg:"Inserte fecha inicio y fecha final  para poder buscar un rago de fechas"
            })
        }else{
            var _q = Doctores;
            _q.findAll({
            where: {[Op.and]: [{createdAt: {[Op.gte]: fecha_inicio }}, {createdAt: {[Op.lte]: fecha_final }}]},
            })
            .then(datas => {
                if(datas == ""){
                    res.status(400).json({
                        success:false,
                        msg:"No hay nada que mostrar"
                    })
                }else{
                    res.status(200).json(datas)
                }
                
            }); 
        }
        
    
    }

    //ruta para poder mostrar doctores con su cuaderno
    static ListDoctores_cuaderno(req, res){
        return Doctores
        .findAll({
            include:[{
                model:Cuadernos,
                //where: { id :'2' }
            }]

        })
        .then(data => res.status(200).send(data))
        .catch(error => res.status(400).send(error));
    }

    //ruta para filtrar
    static filter_cuadernos(req, res) {
        const { fecha_inicio, fecha_final }  = req.body
        if(!fecha_final || !fecha_inicio){
            res.status(400).json({
                success:false,
                msg:"Inserte fecha inicio y fecha final  para poder buscar un rago de fechas"
            })
        }else{
            var _q = Doctores;            
            _q.findAll({
                include:[{                    
                    model:Cuadernos,
                    where: {[Op.and]: [{createdAt: {[Op.gte]: fecha_inicio }}, {createdAt: {[Op.lte]: fecha_final }}]}
                }]
            })
            .then(datas => {
                if(datas == ""){
                    res.status(400).json({
                        success:false,
                        msg:"No hay nada que mostrar"
                    })
                }else{
                    res.status(200).json(datas)
                }
                
            }); 
        }
        
    
    }
    // medico solo uno
   
    static one_Medico(req, res){
        const {id}=req.params
        return Doctores
        .findAll({
            where:{id : id}
        })
        .then(data => res.status(200).send(data))
        .catch(error => res.status(400).send(error));
    }
    
}
export default Doctor;