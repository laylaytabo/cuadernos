import model from '../models';
const{Cuadernos} = model;
class Cuaderno{
    static regist(req, res){
        if(req.body.titulo == "" || req.body.codigo == "" || req.body.grupo == "" ){
            res.status(400).send("Todos los campos son obligatorios")
        }else{
            const{ codigo,titulo,grupo} = req.body
            return Cuadernos
            .create({
                codigo,
                titulo,
                grupo,
                
            }).then(data => res.status(200).send({
                success: true,
                message: 'se inserto con exito',
                data
            }))
            .catch(error => res.status(400).send(error));
        }
    }
    static list(req, res){
        return Cuadernos
        .findAll()
        .then(data => res.status(200).send(data))
        .catch(error => res.status(400).send(error));
    }
}
export default Cuaderno;