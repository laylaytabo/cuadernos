import model from '../models';
const{Doctores} = model;
class Doctor{
    static regist(req, res){
        if(req.body.nombre == "" || req.body.especialidad == "" || req.body.turno == "" || req.body.sala == "" ){
            res.status(400).send("Todos los campos son obligatorios")
        }else{
            const{ nombre,especialidad, turno, sala} = req.body
            const { idCuaderno} = req.params
            return Doctores
            .create({
                nombre,
                especialidad,
                turno,
                sala,
                idCuaderno
                
            }).then(data => res.status(200).send({
                success: true,
                message: 'se inserto con exito',
                data
            }))
            .catch(error => res.status(400).send(error));
        }
    }
    static list(req, res){
        var id = req.params.id;  
        Doctores.findAll({
            where: {idCuaderno: id}
                 
            }).then((data) => {
                res.status(200).json(data);
            }); 
    }
    
}
export default Doctor;