const colors = require('colors');
const readline = require('readline');


const mostrarMenu = () => {

    return new Promise((res,rej)=>{

        // console.clear();
        console.log('============================='.green);
        console.log('    Seleccione una opcion'.green);
        console.log('============================='.green);
        
        console.log(`${'1.'.green} Crear tareas`);
        console.log(`${'2.'.green} Listar tareas`);
        console.log(`${'3.'.green} Listar tareas completadas`);
        console.log(`${'4.'.green} Listar tareas pendientes`);
        console.log(`${'5.'.green} Completar tarea(s)`);
        console.log(`${'6.'.green} Borrar tarea`);
        console.log(`${'0.'.green} salir \n`);
    
        /*  recibir una opcion del usuario */
        // const readLine = require('readline').createInterface({
        //     input: process.stdin,
        //     output: process.stdout
        // })
        const {stdin,stdout} = process;
        const rl = readline.createInterface({ input:stdin, output:stdout });
    
        rl.question('Seleccione una opcion: ',(opcion)=>{
            rl.close();
            res(opcion);
        })
    })

}

const pausa =() =>{
    return new Promise((res,rej)=>{
        const rl = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(`\n Presione ${ 'Enter'.green} para continuar \n`,(opcion)=>{
            rl.close();
            res();
        })
        
    });

}

module.exports = {
    mostrarMenu,
    pausa
}



