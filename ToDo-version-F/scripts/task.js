window.addEventListener('load', function () {
  //
  //  Logica Mis tareas
  //
  const tareasUsername = document.querySelector("#username");
  const panelTareasPendientes = document.querySelector("#tareas-pendientes");
  const panelTareasTerminadas = document.querySelector("#tareas-terminadas");
  const panelSkeleton = document.querySelector("#skeleton");
  const inputNuevaTarea = document.querySelector("#nuevaTarea");
  const botonTareaAgregar = document.querySelector("#tarea-boton-agregar");
  const botonCerrarSesion = document.querySelector("#closeApp");

  // Obtener datos del usuario
  const datosUsuario = {
    obtenerDatos: () => {
      return new Promise((resolve, reject) => {
        let jwt = localStorage.getItem("jwt");

        fetch(`${URLAPI}/users/getMe`, {
          method: "GET",
          headers: {
            Authorization: jwt,
          },
        })
          .then((response) => response.json())
          .then((response) => {
            if (typeof response === "object") {
              resolve(response);
            } else {
              reject(response);
            }
          })
          .catch((err) => {
            alert("Fallo la aplicacion, lo sentimos."); // si el servidor no esta disponible
          });
      });
    },
  }

  // validando el token guardado en localstorage
  datosUsuario
    .obtenerDatos()
    .then((response) => {
      // Cambiando el nombre del usuario
      tareasUsername.innerText = response.firstName;
      // busco las tareas
      buscarTareas();
    })
    .catch((error) => {
      window.location.href = "index.html";
    });


  // funcion para buscar la lista de tareas
  function buscarTareas() {
    tareas.listado()
      .then((response) => {
        // variables
        let tareasCompletas = "";
        let tareasIncompletas = "";

        // filtrando las tareas por completas o incompletas
        response.forEach((tarea) => {
          let fecha = new Date(tarea.createdAt);

          if (tarea.completed) {
            tareasCompletas += `<li class="tarea">
        <div class="descripcion">
          <p class="nombre">${tarea.description}</p>
          <p class="timestamp">Creada: ${fecha.toLocaleDateString()}</p>
          <div>
          <button><i id="${tarea.id}" class="fas
          fa-undo-alt change"></i></button>
          <button><i id="${tarea.id}" class="far
          fa-trash-alt"></i></button>
          </div>
        </div>

      </li>`;
          } else {
            tareasIncompletas += `<li class="tarea">
        <div class="not-done" tareaid="${tarea.id}"></div>
        <div class="descripcion">
          <p class="nombre">${tarea.description}</p>
          <p class="timestamp">Creada: ${fecha.toLocaleDateString()}</p>
        </div>
      </li>`;
          }
        });

        // Eliminando skeleton
        panelSkeleton.remove();
        // Añadiendo el contendio al HTML
        panelTareasPendientes.innerHTML = tareasIncompletas;
        panelTareasTerminadas.innerHTML = tareasCompletas;

        // agregando eventos a los botones de completar tareas
        document.querySelectorAll(".not-done").forEach((nodo) => {
          nodo.addEventListener("click", function (e) {
            completarTarea(e.target.attributes.getNamedItem("tareaid").value);
          });
        });

        // evento reabrir tarea
        document.querySelectorAll('.fa-undo-alt').forEach((nodo) => {
          nodo.addEventListener('click', function (e) {
            reabrirTarea(e.target.attributes.getNamedItem("id").value);
          });
        });

        // evento eliminar tarea
        document.querySelectorAll('.fa-trash-alt').forEach((nodo) => {
          nodo.addEventListener('click', function (e) {
            eliminarTarea(e.target.attributes.getNamedItem("id").value);
          });
        });

      });
  }


// funcion eliminarTarea
function eliminarTarea(tareaID) {
  return tareas
  .eliminar(tareaID)
  .then((response) => {
    Swal.fire({
      icon: "success",
      title: "Exito",
      text: response,
    });
    buscarTareas();
  })
  .catch((error) => {
    Swal.fire({
      icon: "error",
      title: "La tarea no pudo ser eliminada correctamente",
      text: error,
    });
  });
}

  // funcion para completar la tarea
  function completarTarea(tareaID) {
    tareas
      .completar(tareaID)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Exito",
          text: "Tarea completada correctamente!",
        });
        buscarTareas();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Tarea no completada",
          text: error,
        });
      });
  }

  // funcion reabrir tareas
  function reabrirTarea(tareaID) {
    tareas
      .reabrir(tareaID)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Exito",
          text: "Tarea abierta correctamente!",
        });
        buscarTareas();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "La tarea no pudo abrirse correctamente",
          text: error,
        });
      });
  }

  // evento para agregar una tarea
  botonTareaAgregar.addEventListener("click", function (e) {
    e.preventDefault();

    if (inputNuevaTarea.value.length === 0 || inputNuevaTarea.value === " ") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El titulo de la tarea no puede estar vacio.",
      });
    } else {
      // si se valida el titulo de la tarea, se carga por la api
      tareas
        .agregar(inputNuevaTarea.value)
        .then((response) => {
          // si la tarea se cargo correctamente, borro el formulario
          inputNuevaTarea.value = "";
          // actualizo la lista de tareas
          buscarTareas();
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Tarea no creada",
            text: error,
          });
        });
    }
  });

  // cerrar sesion
  botonCerrarSesion.addEventListener("click", function (e) {
    // elimino el token
    // localStorage.removeItem("jwt");
    // aca podria ir tambien localStorage.clear()
    localStorage.clear();
    sessionStorage.clear();
    // vuelvo al index
    window.location.href = "index.html";
  });

})


