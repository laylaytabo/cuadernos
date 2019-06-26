import Cuaderno from '../controllers/cuadernos'
import Doctor from '../controllers/doctores'
import Turno from '../controllers/turnos'
import Especialidad from '../controllers/especialidades'

export default (app) => {

    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the bookStore API!',
    }));


    //cuadernos
    app.post('/api/cuaderno', Cuaderno.regist);
    app.get('/api/liscuaderno', Cuaderno.list);
    app.get('/api/OnlyCuadernos/:id', Cuaderno.OneCuaderno);
    app.post('/api/updateCuaderno/:id', Cuaderno.modifyC);

    app.post('/api/doctor/:idCuaderno', Doctor.regist);
    app.get('/api/doctores/:id', Doctor.list);

    app.post('/api/turnos/:idDoctor', Turno.regist);
    app.get('/api/turnos/:id', Turno.list);

    //servicios
    app.post('/api/especialidad', Especialidad.esp)
    app.get('/api/especialidad', Especialidad.listEsp)
    app.get('/api/EspOne/:id', Especialidad.OneEsp)
    app.post('/api/updateEsp/:id', Especialidad.modify)

    
}