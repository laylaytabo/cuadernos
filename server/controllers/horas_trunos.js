import model from '../models'

const { horas_of_truno } = model

class Horas_Turnos{
    static regHorasTurnos(req,res){
        const { estado,hora } = req.body
        const { id_turnos } = req.params
        return horas_of_truno
        .create({
            estado,
            hora,
            id_turnos
        })
        .then(data => res.status(200).send({

            success: true,
            message: 'se inserto con exito',
            data

        }))
        .catch(error => res.status(400).send(error));
    }
    static listHoras_truno(req, res){
        return horas_of_truno
        .findAll()
        .then(data => res.status(200).send(data))
        .catch(error => res.status(400).send(error));
    }
    //lista de horarios de los turnos 
    static horasTurnos_list(req, res){
        const { id_turnos } = req.params
        horas_of_truno.findAll({
            where : { id_turnos : id_turnos },
          //attributes: [],
        }).then(data => {
          res.status(200).send(data)
        })
    }
    static deleteHoras(req, res) {
        return horas_of_truno
            .findByPk(req.params.id)
            .then(data => {
              if(!data) {
                return res.status(400).send({
                message: 'Book Not Found',
                });
              }
              return data
                .destroy()
                .then(() => res.status(200).send({
                  message: 'Successfully deleted'
                }))
                .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error))
    }

    static Update_Hora(req, res) {
      const { estado, } = req.body
      return horas_of_truno
      .findByPk(req.params.id)
      .then((data) => {
          data.update({
            estado: estado || data.estado,
          })
          .then(update => {
            res.status(200).send({
              message: 'se cambie el estado a'+ estado,
              data: {
                estado: estado || update.estado,
              }
            })
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error)); 
  }

  
}
export default Horas_Turnos;
