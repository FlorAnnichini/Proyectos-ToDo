window.addEventListener('load', function(){

// boton de enviar del form
const botonEnviar = document.querySelector("#botonEnviar");

botonEnviar.addEventListener("click", function (e) {
  // Cancelar en envio del formulario
  e.preventDefault();


  //Obtener campos del formulario
  const inputEmail = document.querySelector("#inputEmail").value;
  const inputPassword = document.querySelector("#inputPassword").value;
  const errorMensaje = document.querySelector("#errorMsg");

  // llamo a la constante usuario definida en api.js
  usuarios
    .login(inputEmail, inputPassword)
    .then((response) => {
      // si no se redirecciona la pagina, muestro el error del porque
      errorMensaje.innerText = response;
    })
    .catch((error) => {
      // si se rompre la aplciacion muestro el error
      alert(error);
    });
  });

})
