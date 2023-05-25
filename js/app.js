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

const ui = new UI();

// * EVENTOS

document.addEventListener('DOMContentLoaded', () => {
  ui.llenarSelectYear();
});

// * FUNCIONES


