import model from '../models';

const{ prueba_fechas } = model;

class Fechas_P{
    static create_fecha(req,res){
        const { fecha } = req.body
        return prueba_fechas
        .create({
            fecha
        })
        .then(data => {
            res.status(200).json({
                success:true,
                msg: "Se inserto una fecha"
            })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                success:false,
                msg: "no se pudo insertar los datos"
            })
        })
    }

    static list_fechas_creadas(req,res){
        return prueba_fechas
        .findAll()
        .then(data => {
            res.status(200).json(data)

        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                success:false,
                msg: "no se pudo mostrar los datos",
                error
            })
        })
    }
    static list_fechas_creadas1(req,res){
        return prueba_fechas
        .findAll( {
           where:{
               createdAt:{
                   [prueba_fechas.between]:['2019-11-04T00:00:00.000Z', '2019-11-05T00:00:00.000Z']
               }
           },
        } )
        .then(data => {
            res.status(200).json(data)

        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                success:false,
                msg: "no se pudo mostrar los datos",
                error:error
            })
        })
    }
}
export default Fechas_P
