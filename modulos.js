export function aplicarFiltros() {
    let texto = textSearch.value.toLowerCase().trim();
    let valoresChekeados = Array.from(document.querySelectorAll('.filter-checkbox:checked')).map(checkbox => checkbox.value.toLowerCase().trim());
    let tarjetas = document.querySelectorAll('.card');
    tarjetas.forEach(tarjeta => {
      let descripcion = tarjeta.querySelector('.card-text').innerText.toLowerCase().trim();
      let categoriaElement = tarjeta.querySelector('.card-text');
      let categoria = categoriaElement ? categoriaElement.classList[1].toLowerCase().trim() : '';
      let cumpleBusqueda = texto === "" || descripcion.includes(texto);
      let cumpleFiltro = valoresChekeados.length === 0 || valoresChekeados.includes(categoria);
      tarjeta.classList.toggle('filtro', !(cumpleBusqueda && cumpleFiltro));
    });
  }

export   function crearTarjetas(eventos, conte){
    let tarjeta = document.createElement('div')
    tarjeta.classList.add('m-3', 'col-lg-3', 'col-md-4', 'col-sm-6', 'col-12', 'card', 'p-1')
    tarjeta.innerHTML = `         
            <img class="cardIMG" src=${eventos.image} alt="imagen">
           <div class="row card-body">
              <h5 class="card-title col-lg-12">${eventos.name}</h5>
               <p class="card-text ${eventos.category}">${truncateText(eventos.description)}</p>
              <p class="col-lg-5 col-12" >Price: $${eventos.price}</p>
              <a href="./Details.html?id=${eventos._id}" class="btn btn-primary details-button col-lg-7 col-12">Details</a>
           </div>
    `
    conte.appendChild(tarjeta)
  }

  function truncateText(text) {
    const maxLength = 70; // Número máximo de caracteres permitidos
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...'; // Truncar el texto si es demasiado largo
    }
    return text;
}