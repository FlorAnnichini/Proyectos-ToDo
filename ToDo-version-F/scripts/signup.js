window.addEventListener('load', function(){
//
//  Logica Registro
//

const inputName = document.querySelector("#name");
const inputLastname = document.querySelector("#lastname");
const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#password");
const inputRepeatPassword = document.querySelector("#repeatPassword");

const errorMensaje = document.querySelector("#error");
const signupButton = document.querySelector("#signup-button");

// agregando evento a los inputs para que si hay error desapareza
document.querySelectorAll("#signup input").forEach((nodo) => {
  nodo.addEventListener("keypress", () => {
    if (errorMensaje.textContent.length > 0) {
      errorMensaje.innerText = "";
    }
  });
});

// ------------------------------------------
// agregando evento al boton de enviar
signupButton.addEventListener("click", function (e) {
  // Bloqueando el evento por defecto
  e.preventDefault();

  // variable control de error
  let error = false;

  // validando que no hay campos vacios
  document.querySelectorAll("#signup input").forEach((nodo) => {
    if (nodo.value.length === 0 || nodo.value === " ") {
      errorMensaje.innerText = "Faltan datos que completar. ";
      error = true; // si hay error, entonces es true
    }
  });

  if (inputPassword.value !== inputRepeatPassword.value) {
    errorMensaje.innerText = "Las contraseñas no coinciden. ";
    error = true; // si hay error, entonces es true
  }
  if (inputName.value.length < 3) {
    errorMensaje.innerText = "El nombre ingresado es incorrecto. ";
    error = true;
  }
  if (inputLastname.value.length < 3) {
    errorMensaje.innerText = "El apellido ingresado es incorrecto. ";
    error = true;
  }
  if (inputEmail.value.length < 13) {
    errorMensaje.innerText = "El email ingresado es incorrecto. ";
    error = true;
  }
  if (inputPassword.value.length < 5 || inputPassword.length > 15) {
    errorMensaje.innerText = "La contraseña es invalida. ";
    error = true;
  }

  if (!error) {
    usuario
    .registrar(inputName.value,
        inputLastname.value,
        inputEmail.value,
        inputRepeatPassword.value
      )
      .then((response) => {
        errorMensaje.innerText = response;
      })
      .catch((error) => alert(error));
  }

});

function normalizacionSignup(name, lastname, email, password) {
  const usuarioRegistroNormalizado = {
    name: name.toLowerCase().trim(),
    lastname: lastname.toLowerCase().trim(),
    email: email.toLowerCase().trim(),
    password: password.trim()
  }

  return usuarioRegistroNormalizado;
}

})