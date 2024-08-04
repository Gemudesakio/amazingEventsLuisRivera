import { aplicarFiltros, crearTarjetas } from "./modulos.js";
fetch("https://aulamindhub.github.io/amazing-api/events.json")
.then(res => res.json())
.then(data=>{
  let tamanio = data.events.length;
let contenedor = document.getElementById("contenedorMain");
let currentDateObj = new Date(data.currentDate);
let contenedorCategory = document.getElementById("category");
let textSearch = document.getElementById('textSearch');
let eventos = data.events

// Extraer las categorías del vector de tareas
let categoria = data.events.map(event => event.category);
let categoriasUnicas = [...new Set(categoria)];

// Crear tarjetas y checkboxes al cargar la página
eventos.forEach(event=>{
  let dateToCompareObj = new Date(event.date);
  if (currentDateObj < dateToCompareObj) {
    crearTarjetas(event, contenedor)
  }
})
categoriasUnicas.forEach(categoria => {
  crearCheckbox(categoria);
});

// Añadir eventos para aplicar filtros
contenedorCategory.addEventListener('change', aplicarFiltros);
textSearch.addEventListener('input', aplicarFiltros);



function crearCheckbox(categoria) {
  let categorias = document.createElement('div');
  categorias.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-2', 'd-flex', 'align-items-center', 'justify-content-start', 'mb-2');
  categorias.innerHTML = `
    <input type="checkbox" id="checkbox" class="me-2 filter-checkbox" value="${categoria}">
    <label for="checkbox">${categoria}</label>
  `;
  contenedorCategory.appendChild(categorias);
}


})

