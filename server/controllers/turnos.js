import model from '../models'
const{Turnos} = model
class Turno{
    static regist(req, res){
        if(req.body.turno == "" || req.body.sala == "" ){
            res.status(400).send("Todos los campos son obligatorios")
        }else{
            const{ turno,sala} = req.body
            const{idDoctor}= req.params
            return Turnos
            .create({
                turno,
                sala,
                idDoctor
            }).then(data => res.status(200).send({
                success: true,
                message: 'se inserto con exito',
                data
            }))
            .catch(error => res.status(400).send(error));
        }
    }
    static list(req, res){
        return Turnos
        .findAll()
        .then(data => res.status(200).send(data))
        .catch(error => res.status(400).send(error));
    }
}
export default Turno;