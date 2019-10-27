import model from '../models';

const{ Especialidades } = model;
const{ Doctores } = model;
const{ Fechas } = model;
const{ Turnos } = model

class Especialidad{

    static esp(req, res) {
      if(!req.body.nombre || !req.body.descripcion){
        res.status(400).send({
          success: false,
          message:'Todos los campos son obligados.'
        })
        console.log(" Todos los campos son Obligatorios")
      }else{
        Especialidades.findOne({
          where:{
            nombre: req.body.nombre 
          }
        }).then(nombre =>{
          if(nombre != null){
            console.log("La especialidad ya existe!")
            res.status(400).json({
              success: false,
              message:"La especialidad ya existe!"
            });
          return;
          }else{
            const { nombre,sigla,descripcion } = req.body
            return Especialidades
            .create({
              nombre,
              sigla,
              descripcion
            })
            .then(serviceData => res.status(200).send ({
                success: true,
                message: 'Especialidad creado correctamente',
                serviceData
            }))
          }
        })
      }
        
    }
    // ruta para poder mostrar todas las especialidades
    static listEsp(req, res){
      return Especialidades
      .findAll()
      .then(serv => res.status(200).send(serv))
      .catch(error => res.status(400).send(error));
    }

    //ruta para poder mostrar una solo especialidad para que pueda ser actualizado
    static OneEsp(req, res){                
       const { id } = req.params
        Especialidades.findAll({
            where: {id: id}
            //attributes: ['id', ['description', 'descripcion']]
          }).then((one) => {
            res.status(200).json(one);
          });     
      }
    //ruta para poder actualizar una especialidad
    static modify(req, res) {
        const { nombre,sigla,descripcion } = req.body
        return Especialidades
          .findByPk(req.params.id)
          .then((data) => {
            data.update({
                nombre: nombre || data.nombre,
                sigla: sigla || data.sigla,
                descripcion: descripcion || data.descripcion
            })
            .then(update => {
              res.status(200).send({
                success:true,
                message: 'La especialidad se actualizado',
                data: {
                  nombre: nombre || update.nombre,
                  sigla: sigla || update.sigla,
                  descripcion: descripcion || update.descripcion
                }
              })
            })
            .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      }

      
    static ListEspTurnos(req, res){
      var data = req.params;
      Especialidades.findAll({
          where : { nombre : data.nombre },
        //attributes: [],
          include: [
              { model: Doctores, attributes: ['id','nombre'], 
              include:[
                  { model: Fechas, attributes:['id'],
                include:[                    
                  { model:Turnos,
                   where:{ diasAten : data.dia, turno:data.turno }}
                ]}                
          ]}]
      }).then(data => {
        res.status(200).send(data)
      })
    }
    static especialidad_nombre(req, res){
      var data = req.params;
      Especialidades.findAll({
        where : { nombre : data.nombre },
        
      }).then(data => {
        res.status(200).send(data)
      })
    }
    static allespeciali(req, res){
      return Especialidades.findAll({
        include:[{
          model: Doctores
        }]
      })
    }
}
export default Especialidad;