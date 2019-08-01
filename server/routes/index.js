import Cuaderno from '../controllers/cuadernos'
import Doctor from '../controllers/doctores'
import Turno from '../controllers/turnos'
import Especialidad from '../controllers/especialidades'
import Fecha from '../controllers/fechas'
import ConsultaEsp from '../controllers/especialidad_consulta'

import Horas_Turnos from '../controllers/horas_trunos'

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
    app.get('/api/Alldoctor', Doctor.ListDoctores)
    app.get('/api/doctores/:id', Doctor.list);
    app.get('/api/IdDoct/:id', Doctor.listDoc);
    app.post('/api/modifyDocCuadern/:id', Doctor.modifyDoctCuaderno); //ruta para modificar

    app.get('/api/doctTurnos/:id', Doctor.doctorTurnos); // ruta para poder mostrar de los doctore  su turno

    //turnos
    app.post('/api/turnos/:idFechas', Turno.regist);
    app.get('/api/ListTurnos', Turno.listTurnos);
    app.get('/api/oneTurno/:id', Turno.OneTurno); // esta ruta trae todos los turnos segun fecha
    app.get('/api/delete/:id', Turno.deleteTurno);

    app.get('/api/ListAll/:dia/:turno', Turno.listT); // Esta ruta trae mas de una tabla

    //horas turnos
    app.post('/api/hora_turno/:id_turnos',Horas_Turnos.regHorasTurnos);
    app.get('/api/horas_turno',Horas_Turnos.listHoras_truno );
    app.get('/api/listHoras_turno/:id_turnos',Horas_Turnos.horasTurnos_list)
    app.get('/api/delete_horas_turnos/:id', Horas_Turnos.deleteHoras)
    app.post('/api/Update_Hora/:id',Horas_Turnos.Update_Hora);
    
    //servicios
    app.post('/api/especialidad', Especialidad.esp)
    app.get('/api/especialidad', Especialidad.listEsp)
    app.get('/api/EspOne/:id', Especialidad.OneEsp)
    app.post('/api/updateEsp/:id', Especialidad.modify)

    app.get( '/api/espTurno/:nombre/:dia/:turno', Especialidad.ListEspTurnos ); //esta ruta muestra todas las especialidades y sus turnos

    //fechas
    app.post('/api/fechas/:id_doctor', Fecha.fechaPOst );
    app.get('/api/fechas', Fecha.listFechas);
    app.get('/api/fechasList/:id', Fecha.listF);//ruta para poder ver las fechas segun doctor
    app.get('/api/oneFecha/:id', Fecha.oneFecha); //ruta para sacar una fecha segun id
    app.post('/api/updateFecha/:id', Fecha.UpdateFecha); //ruta para poder actualizar fecha

    //consulta especialidad

    app.post('/api/reg_consEsp/:id_especialidad' , ConsultaEsp.ConsEspecialidad);
    app.get('/api/list_consEsp', ConsultaEsp.listEspCons);
    app.get('/api/OneEspCons/:id', ConsultaEsp.OneEspCons);// ruta para poder mostrar una sola especialidad para que pueda ser actulizado
    app.get('/api/list_EspCons/:id_especialidad', ConsultaEsp.list_EspCons); // esta rusta es para poder mostrar una lista de especialdades_consulta segun especialidad
    app.post('/api/modifyEspCons/:id', ConsultaEsp.modifyEspCons); // esta ruta sirve para poder actualizar ne la tabla especialidad consulta
    app.get('/api/Esp_Turnos/:nombre/:dia/:turno',ConsultaEsp.List_Esp_Turnos)

    
}