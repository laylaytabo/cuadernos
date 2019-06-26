import Cuaderno from '../controllers/cuadernos'
import Doctor from '../controllers/doctores'
import Turno from '../controllers/turnos'

export default (app) => {

    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the bookStore API!',
    }));
    app.post('/api/cuaderno', Cuaderno.regist);
    app.get('/api/liscuaderno', Cuaderno.list);

    app.post('/api/doctor/:idCuaderno', Doctor.regist);
    app.get('/api/doctores/:id', Doctor.list);

    app.post('/api/turnos/:idDoctor', Turno.regist);
    app.get('/api/turnos/:id', Turno.list);

    
}