import model from '../models';
const{Especialidades} = model;
class Especialidad{
    static regist(req, res){
        if(req.body.nombre == ""  ){
            res.status(400).send("Todos los campos son obligatorios")
        }else{
            const{ nombre} = req.body
            const { id} = req.params
            return Especialidades
            .create({
                nombre,
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
        Especialidades.findAll({
            where: {idCuaderno: id}
                 
            }).then((data) => {
                res.status(200).json(data);
            }); 
    }
    
}
export default Especialidad;