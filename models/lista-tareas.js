const Tarea = require("./tarea");
const colors = require('colors');

class Tareas{
    #listado;
    constructor(){
        this.#listado = {};
    }
    crearTarea(desc=''){
        const tarea = new Tarea(desc);
        this.#listado[tarea.getId] = tarea;
    }
    cargarTareasFromArray(tareas=[]){
        tareas.map(tarea=>this.#listado[tarea.id] = Tarea.fromJson(tarea));
        return this;
    }
    listadoCompleto(){
        console.log('')
        this.getListado.forEach((item,idx) =>{
            const estado = (item.completado)? 'Completada'.green:'Pendiente'.red;
            console.log(` ${colors.green(idx+1+'.')} ${item.descripcion} :: ${estado} `)
        } );
    }
    tareasCompletadasPendientes(completado){
        let count=0;  
        console.log('')
        this.getListado.filter((item)=>{
            const estado = (item.completado)? 'Completada'.green:'Pendiente'.red;
            if(item.completado === completado){
                count++;
                console.log(` ${colors.green(count+'.')} ${item.descripcion} :: ${estado} `)
            }
        });        
    }
    borrarTarea(id=''){
        if(this.#listado[id]){
            delete this.#listado[id];
        }
    }
    toggleCompletadas(ids =[]){
        ids.forEach(id=>{
            const tarea = this.#listado[id];
            if(!tarea.getCompletado){
                tarea.setCompletado = true;
            }
        });
        this.getListado.forEach((tarea)=>{
             if(!ids.includes(tarea.id)){
                 this.#listado[tarea.id].setCompletado = false;
             }
        });

    }
    get getListado(){
        let listclone = {...this.#listado};
        const listado = [];
        for(let i in listclone){
            if(listclone[i] instanceof Tarea){
                const {getId,getCompletado,getDescripcion}= listclone[i];
                listclone[i]={id:getId,completado:getCompletado,descripcion:getDescripcion};
                listado.push(listclone[i])
            }
        }
        return listado;
    }
    
}

module.exports = Tareas;

