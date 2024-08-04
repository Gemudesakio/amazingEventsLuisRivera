fetch("https://aulamindhub.github.io/amazing-api/events.json")
.then(res => {
    if (!res.ok) {
        throw new Error('Error al obtener los datos');
    }
    return res.json();
})
.then(data => {
    const urlSearch = new URLSearchParams(window.location.search);
    const id = parseInt(urlSearch.get('id'));
    if (!id) {
        console.error('ID no encontrado en la URL');
        return;
    }
    const evento = data.events.find(p => p._id === id);
    if (!evento) {
        console.error('Evento no encontrado con ID:', id);
        return;
    }
    let contenedor = document.getElementById('contenedorDetails');

    function crearDetails(evento) {
        let detalles = document.createElement('div');
        detalles.classList.add('row', 'g-0');

        let asistenciaOEstimado = evento.assistance ? evento.assistance : evento.estimate;
        let textoAsistenciaOEstimado = evento.assistance ? "Asistencia" : "Estimado";

        detalles.innerHTML = `
            <div class="col-md-4">
                <img src="${evento.image}" class="img-fluid rounded-start detailsIMG" alt="${evento.name}">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${evento.name}</h5>
                    <p class="card-title"><small class="text-body-secondary">${evento.date}</small></p>
                    <p class="card-text">${evento.description}</p>
                    <p class="card-title"><small class="text-body-secondary">Capacidad: ${evento.capacity} </small></p>
                    <p class="card-title"><small class="text-body-secondary">${textoAsistenciaOEstimado}: ${asistenciaOEstimado}</small></p>
                    <p class="card-title"><small class="text-body-secondary">Precio: ${evento.price}</small></p>
                </div>
            </div>
        `;

        contenedor.appendChild(detalles);
    }

    crearDetails(evento);
})
.catch(error => {
    console.error('Error:', error);
});
