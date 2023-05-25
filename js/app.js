// * VARIABLES
const formulario = document.querySelector('#cotizar-seguro');
const selectYear = document.querySelector('#year');
const spinner = document.querySelector('#cargando');



// * CONSTRUCTORES
function Seguro(marca, year, tipo) {
  this.marca = marca;
  this.year = year;
  this.tipo = tipo;
};

// Realiza la cotizacion
Seguro.prototype.cotizar = function () {
  let cantidad;
  const base = 2000;
  const segunMarca = {
    1: function () { cantidad = base * 1.15 },
    2: function () { cantidad = base * 1.05 },
    3: function () { cantidad = base * 1.35 },
  };
  const segunTpo = {
    basico: function () { cantidad *= 1.30 },
    completo: function () { cantidad *= 1.50 },
  };

  // Dependiendo del tipo de maca seleccionada agreamos un % de la base a la cantidad
  segunMarca[this.marca]();

  // Entre el año seleccionado y el año actual existe una diferencia, por cada año de diferencia agregamos un 3% de la cantidad a cantidad
  const yearActual = new Date().getFullYear();
  const diferencia = yearActual - this.year;

  cantidad -= ((diferencia * 3) * cantidad) / 100;

  // Segun el tipo selecionado incrementamos la cantidad
  segunTpo[this.tipo]();

  return cantidad;
};
function UI() { };

// Genera los años y los agregar en el select de year
UI.prototype.llenarSelectYear = () => {
  const maxYear = new Date().getFullYear();
  const minYear = maxYear - 15;

  for (let i = maxYear; i > minYear; i--) {
    const optionYear = document.createElement('OPTION');
    optionYear.textContent = i;
    optionYear.value = i;

    selectYear.appendChild(optionYear);
  }
};

// Muestra un mensaje en pantalla
UI.prototype.mostrarMensaje = (mensaje, exito = true) => {

  ui.eliminarMensaje();

  const div = document.createElement('DIV');
  div.textContent = mensaje;
  div.classList.add('mensaje', 'mt-10');

  (exito)
    ? div.classList.add('correcto')
    : div.classList.add('error');

  formulario.insertBefore(div, document.querySelector('#resultado'));
};

// Elimina un mensaje en caso de  existir
UI.prototype.eliminarMensaje = () => {
  const existeMensaje = document.querySelector('.mensaje');

  if (existeMensaje) existeMensaje.remove();

};

// Muestra el resultado en pantalla
UI.prototype.mostrarResultado = (seguro, total) => {
  const resultadoDiv = document.querySelector('#resultado');
  const div = document.createElement('DIV');

  div.classList.add('mt-10', 'resultado');
  div.innerHTML = `
  <p class="header">Tu Resumen</p>
  <p class="font-bold">Total : ${total}</p>
  `;

  // Mostramos el spinner
  spinner.style.display = "block";

  setTimeout(() => {
    // Desactivamos el spinner
    spinner.style.display = "none";

    // Eliminamos el mensaje de aterta
    ui.eliminarMensaje();

    // Mostramos el resultado
    resultadoDiv.appendChild(div);
  }, 1000);

};

const ui = new UI();



// * EVENTOS
document.addEventListener('DOMContentLoaded', () => {
  ui.llenarSelectYear();
  formulario.addEventListener('submit', cotizarSeguro);
});



// * FUNCIONES
// Cotiza el seguro
const cotizarSeguro = (event) => {
  event.preventDefault();

  const marca = document.querySelector('#marca').value;
  const year = document.querySelector('#year').value;
  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  if ([marca, year, tipo].includes('')) {
    ui.mostrarMensaje('Todos los campos son obligatorios', false);
    return;
  }
  // Si pasa la validacion eliminamos y mostrmos otro mensaje
  ui.mostrarMensaje('Cotizando...');

  // Instanciamos un seguro
  const seguro = new Seguro(marca, year, tipo);
  const total = seguro.cotizar();

  // Mostramos el resultado
  ui.mostrarResultado(seguro, total);
};


