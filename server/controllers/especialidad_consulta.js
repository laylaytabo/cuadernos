import model from '../models';

const { Consulta_especilaida } = model

const{ Doctores } = model;
const{ Fechas } = model;
const{ Turnos } = model

class ConsultaEsp{
    static ConsEspecialidad(req,res){
        const { nombre,sigla,descripcion } = req.body
        const { id_especialidad } = req.params
        return Consulta_especilaida
        .create({
            nombre,
            sigla,
            descripcion,
            id_especialidad
        })
        .then(serviceData => res.status(200).send ({
            success: true,
            message: 'successfully created',
            serviceData
        }))
    }
    static listEspCons(req, res){
        return Consulta_especilaida
            .findAll()
            .then(serv => res.status(200).send(serv))
            .catch(error => res.status(400).send(error));
    }
     //ruta para poder mostrar una solo especialidad consulta para que pueda ser actualizado
     static OneEspCons(req, res){                
        const { id } = req.params
        Consulta_especilaida.findAll({
            where: {id : id}
             //attributes: ['id', ['description', 'descripcion']]
        }).then((one) => {
          res.status(200).json(one);
        });     
    }
    //ruta para poder mostrar una lista especialidad_consulta segun su especialidad
    static list_EspCons(req, res){                
        const { id_especialidad } = req.params
        Consulta_especilaida.findAll({
            where: {id_especialidad : id_especialidad}
             //attributes: ['id', ['description', 'descripcion']]
        }).then((one) => {
          res.status(200).json(one);
        });     
    }

    //ruta para poder actualizar ne consulta especialidades
    static modifyEspCons(req, res) {
        const { nombre,sigla,descripcion } = req.body
        return Consulta_especilaida
          .findByPk(req.params.id)
          .then((data) => {
            data.update({
                nombre: nombre || data.nombre,
                sigla: sigla || data.sigla,
                descripcion: descripcion || data.descripcion
            })
            .then(update => {
              res.status(200).send({
                message: 'Servcio actualizado',
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

    static List_Esp_Turnos(req, res){
        var data = req.params;
        Consulta_especilaida.findAll({
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
}

export default ConsultaEsp;