import model from '../models';

const{ Fechas } = model;

class Fecha {
    static fechaPOst(req,res){
        if( req.body.fechaini == "" || req.body.fechafin == "" ){
            res.status(400).json({
                success: false,
                message: "Todos los campos son obligatorios"
            })
        }else{
            const { fechaini,fechafin } = req.body;
            const { id_doctor } = req.params;
            return Fechas
            .create({
                fechaini,
                fechafin,
                id_doctor
            })
            .then(data => res.status(200).send({
                success: true,
                message: 'Se inserto con exito',
                data
            }))
            .catch(error => res.status(400).send(error));
        }
    }
    //ruta para poder ver todas las fechas
    static listFechas(req, res){
        return Fechas
        .findAll()
        .then(data => res.status(200).send(data))
        .catch(error => res.status(400).send(error));
    }
    //ruta para ver fecha de contrato del doctor
    static listF(req, res){
        var id = req.params.id;  
        Fechas.findAll({
            where: {id_doctor: id},             
            }).then((data) => {
                res.status(200).json(data);
            }); 
    }
    
    static oneFecha(req, res){
        var id = req.params.id;  
        Fechas.findAll({
            where: {id: id},             
            }).then((data) => {
                res.status(200).json(data);
            }); 
    }

    static UpdateFecha(req, res) {

        const { fechaini,fechafin } = req.body

        return Fechas
          .findByPk(req.params.id)
          .then((data) => {
            data.update({
                fechaini: fechaini || data.fechaini,
                fechafin: fechafin || data.fechafin
            })
            .then(update => {
              res.status(200).send({
                message: 'Servcio actualizado',
                data: {
                    fechaini: fechaini || update.fechaini,
                    fechafin: fechafin || update.fechafin
                }
              })
            })
            .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
       
      }
}


export default Fecha;