// * VARIABLES
const formulario = document.querySelector('#cotizar-seguro');
const selectYear = document.querySelector('#year');



// * CONSTRUCTORES
function Seguro(marca, year, tipo) {
  this.marca = marca;
  this.year = year;
  this.tipo = tipo;
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
};


