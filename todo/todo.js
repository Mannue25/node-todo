
const fs = require ('fs');

let listadoTodo = [];

const guardarDB = () => {

    let data = JSON.stringify(listadoTodo);

    fs.writeFile('db/data.json', data, (err) => {

        if (err) throw new Error ('No se puede guardar', err);
    });
}

const cargarDB = () => {
    try {
        listadoTodo = require('../db/data.json');
    } catch (error) {
        listadoTodo = [];
    }
    
}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };
    listadoTodo.push(porHacer);

    guardarDB();

    return porHacer;
}

const getListado = () => {

    cargarDB();

    return listadoTodo;
    
}

const actualizar = (descripcion, completado = true) => {

    cargarDB();
    
    let index = listadoTodo.findIndex(tarea => {

        return tarea.descripcion === descripcion;

    });
    if (index >= 0) {
        listadoTodo[index].completado = completado;

        guardarDB();

        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {

    cargarDB();

  let nuevoListado = listadoTodo.filter(tarea => {

    return tarea.descripcion !== descripcion

  });

  if(listadoTodo.length === nuevoListado.length) {
      return false
  } else {
      listadoTodo = nuevoListado;
      guardarDB();

      return true
  }
 
}

module.exports = {

    crear,
    getListado,
    actualizar,
    borrar
}