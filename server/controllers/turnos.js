import model from '../models'

const{ Turnos } = model
const{ Fechas } = model;
const{Doctores} = model;
const{ Especialidades } = model;

class Turno{
    static regist(req, res){
        if( req.body.cantiFicha == "" || req.body.diasAten == "" || req.body.turno == "" ) {
            res.status(400).send("Todos los campos son obligatorios")
        }else{
            const{ cantiFicha,diasAten, turno } = req.body
            const{ idFechas }= req.params
            return Turnos
            .create({

                cantiFicha,
                diasAten, 
                turno,
                idFechas

            }).then(data => res.status(200).send({

                success: true,
                message: 'se inserto con exito',
                data

            }))
            .catch(error => res.status(400).send(error));
        }
    }
    
    static listTurnos(req, res){
        return Turnos
        .findAll()
        .then(data => res.status(200).send(data))
        .catch(error => res.status(400).send(error));
    }

    static OneTurno(req,res){
        const { id } = req.params;
        Turnos.findAll({
            where : { idFechas: id }
        })
        .then((data) => {
            res.status(200).json(data);
        })
    }
    static deleteTurno(req, res) {
        const { id } = req.params
        return Turnos
          .findByPk(id)
          .then(turno => {
            if(!turno) {
              return res.status(400).send({
              message: 'NO hay nada que eliminar',
              });
            }
            return turno
              .destroy()
              .then(() => res.status(200).send({
                message: 'Se elimino con exito'
              }))
              .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error))
    }
    //lista de un turno sus fechas doctor y especialidad
    static listT(req, res){
        var data = req.params;
        Turnos.findAll({
            where : { diasAten : data.dia, turno: data.turno },
          //attributes: [],
            include: [
                { model: Fechas, attributes: ['id'], 
                include:[
                    { model: Doctores,}                
            ]}]
        }).then(users => {
          res.status(200).send(users)
        })
    }
}
export default Turno;