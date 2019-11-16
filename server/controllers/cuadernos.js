import model from '../models';
const{Cuadernos} = model;
const{Doctores} = model;
class Cuaderno{
    static regist(req, res){
        if(req.body.titulo == "" || req.body.grupo == "" ){
            res.status(400).json({
                success: false,
                message:"Todos los campos son obligatorios"
            })
        }else{
            Cuadernos.findOne({
                where:{
                    titulo: req.body.titulo
                }
            }).then(cuader =>{
                if(cuader != null){
                    console.log("El Cuaderno ya existe")
                    res.status(400).json({
                        success:false,
                        message:'El Cuaderno ya existe'
                    })
                    return;
                }else{
                    const{ titulo,grupo} = req.body
                    return Cuadernos
                    
            
                    .create({
                        
                        titulo,
                        grupo,
                        
                    }).then(data => res.status(200).json({
                        success: true,
                        message: 'Se inserto con exito',
                        data
                    }))
                    .catch(error => res.status(400).send(error));

                }
            })
           
        }
    }
    //ruta para sacar todos los cuadernos
    static list(req, res){
        return Cuadernos
        .findAll()
        .then(data => res.status(200).send(data))
        .catch(error => res.status(400).send(error));
    }
    //ruta para solo sacar un cuaderno 
    static OneCuaderno(req, res){                
        const { id } = req.params
        Cuadernos.findAll({
             where: {id: id}
             //attributes: ['id', ['description', 'descripcion']]
           }).then((one) => {
             res.status(200).json(one);
           });     
    }

    // ruta para poder actualizar cuadernos
    static modifyC(req, res) {
        const { titulo,grupo } = req.body
        return Cuadernos
            .findByPk(req.params.id)
            .then((data) => {
                data.update({                    
                    titulo: titulo || data.titulo,
                    grupo: grupo || data.grupo
                })
                .then(update => {
                    res.status(200).send({
                        success: true,
                      message: 'Cuaderno actualizado',
                      data: {                       
                        titulo: titulo || update.titulo,
                        grupo: grupo || update.grupo
                      }
                    })
                })
                .catch(error => res.status(400).send({
                    success: false,
                    message: 'Actualizacion Fallida',
                    error}));
            })
            .catch(error => res.status(400).send(error));
    }
   

}
export default Cuaderno;