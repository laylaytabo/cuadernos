import model from '../models';

const{ Doctores } = model;
const{ Fechas } = model;
const{ Turnos } = model
const{ Especialidades } = model;

const { Consulta_especilaida } = model


class Doctor{
    static regist(req, res){
        if(req.body.nombre == "" || req.body.especialidad == "" || req.body.turno == "" || req.body.sala == "" ){
            res.status(400).send("Todos los campos son obligatorios")
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
                    message: 'se inserto con exito',
                    data
                }))
                .catch(error => res.status(400).send(error));
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
                {model:Especialidades, attributes:['nombre']}
            ]               
            }).then((data) => {
                res.status(200).json(data);
            }); 
    }

    //ruta para actualizar
    static modifyDoctCuaderno(req, res) {
        Especialidades.findAll({
            where: {nombre: req.body.especialidad}
        })
        .then((data) => {
            var id = data[0].id
            console.log(" <<<<<<<<<<<<<<<<<   ",id)
            const {nombre,TDoctor, enfermera } = req.body
            var id_espcialidad = id;
            return Doctores
              .findByPk(req.params.id)
              .then((data) => {
                data.update({
                    nombre: nombre || data.nombre,
                    TDoctor: TDoctor || data.TDoctor,
                    enfermera: enfermera || data.enfermera,
                    id_espcialidad:id_espcialidad || data.id_espcialidad
                })
                .then(update => {
                  res.status(200).send({
                    message: 'Servcio actualizado',
                    data: {
                        nombre: nombre || update.nombre,
                        TDoctor: TDoctor || update.TDoctor,
                        enfermera: enfermera || update.enfermera,
                        id_espcialidad:id_espcialidad || update.id_espcialidad
                    }
                  })
                })
                .catch(error => res.status(400).send(error));
              })
              .catch(error => res.status(400).send(error));
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
    
}
export default Doctor;