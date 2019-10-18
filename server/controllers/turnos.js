import model from '../models'

const{ Turnos } = model
const{ Fechas } = model;
const{Doctores} = model;
const{ Especialidades } = model;

class Turno{
    static regist(req, res){
        if( /*req.body.cantiFicha == "" || */req.body.diasAten == "" || req.body.turno == "" ) {
            res.status(400).json({
                success: false,
                message:"Todos los campos son obligatorios"
            })
        }else{
            return Turnos
            .findAll({
                where:{ idFechas: req.params.idFechas, diasAten: req.body.diasAten }
            })
            .then(data => {
                console.log(data, "  <<<<<<<<<<<<<<<<<<<< esto")
                 if(data == ""){
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
                }else{
                    res.status(400).json({
                        success:false,
                        message:"Ese dia "+req.body.diasAten+" ya esta registrado"
                    })
                }
            })

            
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
              return res.status(400).json({
                success:false,
                message: 'NO hay nada que eliminar',
              });
            }
            return turno
              .destroy()
              .then(() => res.status(200).json({
                success: true,                 
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
    static one_turno_dia(req, res){
        const { dia } = req.params
        return Turnos
        .findAll({
            where:{ diasAten: dia }
        })
        .then(data => res.status(200).send(data))
        .catch(error => res.status(400).send(error));
    }
}
export default Turno;