import Cuaderno from '../controllers/cuadernos'
import Doctor from '../controllers/doctores'
import Turno from '../controllers/turnos'
import Especialidad from '../controllers/especialidades'
import Fecha from '../controllers/fechas'

export default (app) => {

    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the bookStore API!',
    }));


    //cuadernos
    app.post('/api/cuaderno', Cuaderno.regist);
    app.get('/api/liscuaderno', Cuaderno.list);
    app.get('/api/OnlyCuadernos/:id', Cuaderno.OneCuaderno);
    app.post('/api/updateCuaderno/:id', Cuaderno.modifyC);

    //doctor
    app.post('/api/doctor/:idCuaderno', Doctor.regist);
    app.get('/api/doctores/:id', Doctor.list);
    app.get('/api/IdDoct/:id', Doctor.listDoc);
    app.post('/api/modifyDocCuadern/:id', Doctor.modifyDoctCuaderno); //ruta para modificar

    //turnos
    app.post('/api/turnos/:idFechas', Turno.regist);
    app.get('/api/ListTurnos', Turno.listTurnos);
    app.get('/api/oneTurno/:id', Turno.OneTurno); // esta ruta trae todos los turnos segun fecha
    //servicios
    app.post('/api/especialidad', Especialidad.esp)
    app.get('/api/especialidad', Especialidad.listEsp)
    app.get('/api/EspOne/:id', Especialidad.OneEsp)
    app.post('/api/updateEsp/:id', Especialidad.modify)

    //fechas
    app.post('/api/fechas/:id_doctor', Fecha.fechaPOst );
    app.get('/api/fechas', Fecha.listFechas);
    app.get('/api/fechasList/:id', Fecha.listF);//ruta para poder ver las fechas segun doctor
    app.get('/api/oneFecha/:id', Fecha.oneFecha); //ruta para sacar una fecha segun id
    app.post('/api/updateFecha/:id', Fecha.UpdateFecha); //ruta para poder actualizar fecha

    
}