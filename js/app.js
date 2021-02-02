// Variables
const btnEnviar = document.querySelector("#enviar");
const btnReset = document.querySelector("#resetBtn");
const formulario = document.querySelector("#enviar-mail");

// variables para campos
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");

const er = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

eventListeners();
function eventListeners() {
  document.addEventListener("DOMContentLoaded", iniciarApp);

  //   campos formularios
  email.addEventListener("blur", validarFormulario);
  asunto.addEventListener("blur", validarFormulario);
  mensaje.addEventListener("blur", validarFormulario);

  // Reiniciar el formulario
  btnReset.addEventListener("click", resetearFormulario);

  // Enviar email
  formulario.addEventListener("submit", envairEmail);
}

// Funciones
function iniciarApp() {
  btnEnviar.disabled = true;
  btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
}

function validarFormulario(e) {
  // valida que haya algo
  if (e.target.value.length > 0) {
    // elimana el mensaje de error
    const error = document.querySelector("p.error");
    if (error) {
      error.remove();
    }

    e.target.classList.remove("border", "border-red-500");
    e.target.classList.add("border", "border-green-500");
  } else {
    // e.target.style.borderBottomColor = "red";
    e.target.classList.remove("border", "border-green-500");
    e.target.classList.add("border", "border-red-500");

    mostrarError("Todos los campos son obligatorios");
  }
  // valida   el email
  if (e.target.type === "email") {
    if (er.test(e.target.value)) {
      // elimana el mensaje de error
      const error = document.querySelector("p.error");
      if (error) {
        error.remove();
      }

      e.target.classList.remove("border", "border-red-500");
      e.target.classList.add("border", "border-green-500");
    } else {
      e.target.classList.remove("border", "border-green-500");
      e.target.classList.add("border", "border-red-500");
      mostrarError("Email no válido");
    }
  }

  // valida que este todo bien
  if (er.test(email.value) && asunto.value !== "" && mensaje.value !== "") {
    btnEnviar.disabled = false;
    btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
  }
}

function mostrarError(mensaje) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = mensaje;
  mensajeError.classList.add(
    "border",
    "border-red-500",
    "background-red-100",
    "text-red-500",
    "p-3",
    "mt-5",
    "text-center",
    "rounded-xl",
    "error"
  );

  const errores = document.querySelectorAll(".error");

  if (errores.length === 0) {
    formulario.appendChild(mensajeError);
  }
}

// Envia email
function envairEmail(e) {
  e.preventDefault();

  const spinner = document.querySelector(".sk-cube-grid");
  spinner.classList.remove("hidden-spinner");

  setTimeout(() => {
    spinner.classList.add("hidden-spinner");

    const parrafo = document.createElement("p");
    parrafo.textContent = "El mensaje se envió correctamente";
    parrafo.classList.add(
      "text-center",
      "my-10",
      "p-5",
      "bg-green-500",
      "text-white",
      "rounded-xl"
    );

    formulario.insertBefore(parrafo, spinner);

    setTimeout(() => {
      parrafo.remove();
      resetearFormulario();
    }, 5000);
  }, 3000);
}

function resetearFormulario() {
  formulario.reset();
  iniciarApp();
}
