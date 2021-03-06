//
//  LLamadas a la API
//

const URLAPI = "https://ctd-todo-api.herokuapp.com/v1";


const usuarios = {

    registrar: (name, lastname, email, password) => {
        return new Promise((resolve, reject) => {
            fetch(`${URLAPI}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: `{"firstName":"${name}","lastName":"${lastname}","email":"${email}","password":"${password}"}`,
            })
                .then((response) => response.json())
                .then((response) => {
                    // cuerpo formateado
                    if (response.jwt) {
                        // si recibo el token
                        localStorage.setItem("jwt", response.jwt);
                        window.location.href = "mis-tareas.html";
                    } else {
                        // si recibo algun otro tipo de error
                        resolve(response);
                    }
                })
                .catch((err) => reject("Fallo la aplicacion, lo sentimos.")); // si el servidor no esta disponible
        });
    },
    login: (email, password) => {
        return new Promise((resolve, reject) => {
            fetch(`${URLAPI}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: `{"email":"${email}","password":"${password}"}`,
            })
                .then((response) => response.json())
                .then((response) => {
                    // cuerpo formateado
                    if (response.jwt) {
                        // si recibo el token
                        localStorage.setItem("jwt", response.jwt);
                        window.location.href = "mis-tareas.html";
                    } else {
                        // si recibo algun otro tipo de error
                        resolve(response);
                    }
                })
                .catch((err) => reject("Fallo la aplicacion, lo sentimos.")); // si el servidor no esta disponible
        });
    },
    // obtenerDatos: () => {
    //     return new Promise((resolve, reject) => {
    //         let jwt = localStorage.getItem("jwt");

    //         fetch(`${URLAPI}/users/getMe`, {
    //             method: "GET",
    //             headers: {
    //                 Authorization: jwt,
    //             },
    //         })
    //             .then((response) => response.json())
    //             .then((response) => {
    //                 if (typeof response === "object") {
    //                     resolve(response);
    //                 } else {
    //                     reject(response);
    //                 }
    //             })
    //             .catch((err) => {
    //                 alert("Fallo la aplicacion, lo sentimos."); // si el servidor no esta disponible
    //             });
    //     });
    // },
};

const tareas = {
    agregar: (descripcion) => {
        // Agrega una nueva tarea
        return new Promise((resolve, reject) => {
            fetch(`${URLAPI}/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("jwt"),
                },
                body: `{"description":"${descripcion}","completed":false}`,
            })
                .then((response) => response.json())
                .then((response) => {
                    // si la tarea se creo correctamente
                    if (typeof response === "object") {
                        resolve(response);
                    } else {
                        // si la aplicacion devuelve otro status code
                        reject(response);
                    }
                })
                .catch((err) => {
                    alert("Fallo la aplicacion, lo sentimos."); // si el servidor no esta disponible
                });
        });
    },
    listado: () => {
        return new Promise((resolve, reject) => {
            fetch(`${URLAPI}/tasks`, {
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("jwt"),
                },
            })
                .then((response) => response.json())
                .then((response) => {
                    // si trajo todas las tareas
                    if (typeof response === "object") {
                        resolve(response);
                    } else {
                        // si la aplicacion devuelve otro status code
                        reject(response);
                    }
                })
                .catch((err) => {
                    alert("Fallo la aplicacion, lo sentimos."); // si el servidor no esta disponible
                });
        });
    },
    completar: (idTarea) => {
        return new Promise((resolve, reject) => {
            fetch(`${URLAPI}/tasks/${idTarea}`, {
                method: "PUT",
                headers: {
                    Authorization: localStorage.getItem("jwt"),
                    "Content-Type": "application/json",
                },
                body: '{"completed": true}',
            })
                .then((response) => response.json())
                .then((response) => {
                    // si se actualizo correctamente
                    if (typeof response === "object") {
                        resolve(response);
                    } else {
                        // si la aplicacion devuelve otro status code
                        reject(response);
                    }
                })
                .catch((err) => {
                    alert("Fallo la aplicacion, lo sentimos."); // si el servidor no esta disponible
                });
        });
    },
    eliminar: (idTarea) => {
        return new Promise((resolve, reject) => {
            fetch(`${URLAPI}/tasks/${idTarea}`,  {
                "method": "DELETE",
                "headers": {
                    Authorization: localStorage.getItem("jwt"),
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    // console.log(response.status);
                    if(response.status === 200){
                        resolve("La tarea se borro correctamente")
                    }else{
                        reject(`Error ${response.status}`)
                    }
                })
                .catch((err) => {
                    alert("Fallo la aplicacion, lo sentimos."); // si el servidor no esta disponible
                });
        });
    },
    reabrir: (idTarea) => {
        return new Promise((resolve, reject) => {
            fetch(`${URLAPI}/tasks/${idTarea}`, {
                method: "PUT",
                headers: {
                    Authorization: localStorage.getItem("jwt"),
                    "Content-Type": "application/json",
                },
                body: '{"completed": false}',
            })
                .then((response) => response.json())
                .then((response) => {
                    // si se actualizo correctamente
                    if (typeof response === "object") {
                        resolve(response);
                    } else {
                        // si la aplicacion devuelve otro status code
                        reject(response);
                    }
                })
                .catch((err) => {
                    alert("Fallo la aplicacion, lo sentimos."); // si el servidor no esta disponible
                });
        });
    }
};
