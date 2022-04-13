const colors = require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmarPregunta, mostrarListadoCompletado } = require('./helpers/inquirer');
const {mostrarMenu, pausa:pausaMensaje} = require('./helpers/mensajes');
const Tareas = require('./models/lista-tareas');
console.clear()

/* uso de inquirer */
const main = async() => { 
    let opcion ='';
    const listaTareas = new Tareas();
    const tareasDB = leerDB();
    if(tareasDB){ //cargar tareas
        // Establecer las tareas
        listaTareas.cargarTareasFromArray(tareasDB).getListado;
    }

    do{
        // Imprimir el menu
        opcion = await inquirerMenu();  
        switch (opcion) {
            case '1':   // Crear tarea
                const desc = await leerInput('Descripcion: ');
                listaTareas.crearTarea(desc);
                break;
            case '2':  // Listar todas las tareas
                listaTareas.listadoCompleto();
                break;
            case '3':  // Listar las tareas completadas
                listaTareas.tareasCompletadasPendientes(true);
                break;
            case '4': // Listar las tareas pendientes
                listaTareas.tareasCompletadasPendientes(false);
                break;
            case '5': // marcar como completadas y pendientes 
                const ids= await mostrarListadoCompletado(listaTareas.getListado);
                listaTareas.toggleCompletadas(ids);
                break;
            case '6': // Borrar tareas
                const id =  await listadoTareasBorrar(listaTareas.getListado);
                if(id !== '0'){
                    const confirmar = await confirmarPregunta('Estas seguro?');
                    if(confirmar){
                        listaTareas.borrarTarea(id);
                        console.log('  Tarea borrada');
                    }
                }
                break;
            
        }
        guardarDB(listaTareas.getListado);
        await pausa();
    }while(opcion !== '0');
 }

 /* Demostracion sin inquirer */
// const main = async() => { 
//     console.log('Hola mundo');
//     let opcion ='';
//     do{
//         opcion = await mostrarMenu();
//         if(opcion !== '0') {await pausa();}
//     }while(opcion !== '0');
//  }

 main();




