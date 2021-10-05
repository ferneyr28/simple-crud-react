import React, { useState } from "react";
import { nanoid } from "nanoid";

function App() {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);
  const [estado, setEstado] = useState(null);
  const [id, setId] = useState('')
  const [error, setError] = useState(null)

  const guardarTarea = (e) => {
    e.preventDefault();

    if (!tarea.trim()) {
      setError("debe ingresar una tarea");
      return
    }

    setTareas([...tareas, { id: nanoid(), nombreTarea: tarea }]);
    setTarea("");
    setError(null);
  };

  const borrar = (id) => {
    console.log(id)
    const arrayNuevo = tareas.filter(elemento => elemento.id !== id);
    setTareas(arrayNuevo)
    

  }

  const actualizar = (elemento) => {
      // console.log(elemento)
      setEstado(elemento)
      setTarea(elemento.nombreTarea);
      setId(elemento.id);

  }

  const actualizarTarea = (e) => {
    e.preventDefault();
    if(!tarea.trim()){
      setError('Ingresa tarea')
      return
    }

    const actualizaElemento = tareas.map(elemento => {
      if(elemento.id === id) elemento.nombreTarea = tarea;
      return elemento;
    })

    setTareas(actualizaElemento);
    setTarea('')
    setEstado(null);
    setError(null);

  }

  return (
    <div className="container">
      <h1 className="text-center">Crud Simple</h1>
      <hr />

      <div className="row">
        <div className="col-8">
          
          <h4 className="text-center">
            { 
             tareas.length === 0 ? 'No hay tareas' : 'Lista de tareas'
            }
          </h4>

          <ul className="list-group">
            {tareas.map((elemento) => (
              <li className="list-group-item" key={elemento.id}>
                <span className="lead">{elemento.nombreTarea}</span>
                <button
                  className="btn btn-warning  btn-sm float-right mx-2 align-right"
                  onClick={()=> actualizar(elemento)}
                >
                  Actualizar
                </button>
                <button
                  className="btn btn-danger btn-sm float-right"
                  onClick={()=> borrar(elemento.id)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-4">
          <h4 className="text-center">{!estado ? 'Agregar tarea' : 'Actualizar'}</h4>
          {
            error ? <span className="text-danger">{error}</span> : null
          }
          <form onSubmit={!estado ? guardarTarea : actualizarTarea}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese tarea"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />
            {
              !estado ? (
                <button className="btn btn-dark btn-block" type="submit">
                  Agregar
                </button>
              ) : (
                <button className="btn btn-warning btn-block">
                  Actualizar
                </button>
              )
            }
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
