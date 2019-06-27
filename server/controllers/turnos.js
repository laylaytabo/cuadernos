import model from '../models'

const{ Turnos } = model

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
}
export default Turno;