  import { aplicarFiltros, crearTarjetas } from "./modulos.js"
  fetch("https://aulamindhub.github.io/amazing-api/events.json")
  .then(res => res.json())
  .then(data => {
    let contenedor = document.getElementById("contenedorMain")
    let contenedorCategory = document.getElementById("category")
    let textSearch = document.getElementById('textSearch')
    //extraer las categorias del vector de tareas
    let categoria = data.events.map( event => event.category)
    let categoriasUnicas = [...new Set(categoria)];
    let eventos = data.events
    console.log(eventos);
    
  
  
   
  // Verificar si se están seleccionando los checkboxes
  
  
    eventos.forEach(event =>{
    
       crearTarjetas(event, contenedor)
    })
    categoriasUnicas.forEach( categoria => {
        crearCheckbox(categoria)
    })
  
    contenedorCategory.addEventListener('change', aplicarFiltros)
    textSearch.addEventListener('input', aplicarFiltros)

  function crearCheckbox(categoria){
     let categorias = document.createElement('div')
     categorias.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-2', 'd-flex', 'align-items-center', 'justify-content-start', 'mb-2')
       categorias.innerHTML=`  <input type="checkbox" id="checkbox" class="me-2 filter-checkbox" value="${categoria}">
                <label for="checkbox">${categoria}</label>
       `

       contenedorCategory.appendChild(categorias)
  }
  
  })
  .catch(e=> console.log(e))

  