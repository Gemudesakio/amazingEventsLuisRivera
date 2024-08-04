fetch("https://aulamindhub.github.io/amazing-api/events.json")
    .then(res => {
        if (!res.ok) {
            throw new Error('Error al obtener los datos')
        }
        return res.json()
    })
    .then(data => {
        let eventos = data.events
        let fechaActual = new Date(data.currentDate)
        console.log(fechaActual)

        let resultado = eventos.map(element => {
            let PorAsist = element.assistance ? (element.assistance / element.capacity) * 100 : (element.estimate / element.capacity) * 100
            return {
                name: element.name,
                PorcentajeAsistencia: PorAsist,
                capacity: element.capacity
            }
        })

        let asistencia = calcularAsistencia(resultado)
        

        let categorias = eventos.map(e => e.category)
        let categoriasUnicas = [...new Set(categorias)]
        let vectorobjCategoria = categoriasUnicas.map(categoria => {
            let objCategoria = calcularIngresoCategoria(eventos, categoria, fechaActual)
            objCategoria.porcentajeAsistenciaTotalPAST = objCategoria.porcentajeAsistenciaTotalPAST.toFixed(2) // Redondear a 2 decimales
            objCategoria.porcentajeAsistenciaTotalUPC = objCategoria.porcentajeAsistenciaTotalUPC.toFixed(2) 
            return objCategoria
        })

        console.log(vectorobjCategoria)

        //mostrar en la tabla

        let contenedorTabla = document.getElementById('tableStats')
        let tablaStats = document.createElement('table')
        tablaStats.classList.add('table', 'table-bordered', 'table-custom', 'mb-0','table-hover','table-primary')
        tablaStats.innerHTML=`
        <thead class="table-header ">
                <tr>
                    <th colspan="3" class="table-primary">Events Statistics</th>
                </tr>
                <tr class="table-secondary">
                    <th>Events with highest % of assistance</th>
                    <th class="d-none d-md-table-cell">Events with lowest % of assistance</th> 
                    <th class="d-none d-lg-table-cell">Events with larger capacity</th> 
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="py-3">${asistencia.mayorAsistencia.name}</td>
                    <td class="d-none d-md-table-cell py-3">${asistencia.menorAsistencia.name}</td>
                    <td class="d-none d-lg-table-cell py-3">${asistencia.mayorCapacidad.name}</td>
                </tr>
            </tbody>
         
            <thead class="table-section-header table-primary">
                <tr>
                    <th colspan="3">Upcoming events statistics by category</th>
                </tr>
            </thead>
            <thead class="table-header table-secondary">
                <tr>
                    <th>Categories</th>
                    <th class="d-none d-md-table-cell">Revenues</th> 
                    <th class="d-none d-lg-table-cell">Percentage of assistance</th> 
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="py-3">${vectorobjCategoria[0].categoria}</td>
                    <td class="d-none d-md-table-cell py-3">$ ${vectorobjCategoria[0].ingresoTotalUPC}</td>
                    <td class="d-none d-lg-table-cell py-3">${vectorobjCategoria[0].porcentajeAsistenciaTotalUPC} %</td>
                </tr>
                  <tr>
                    <td class="py-3">${vectorobjCategoria[1].categoria}</td>
                    <td class="d-none d-md-table-cell py-3">$ ${vectorobjCategoria[1].ingresoTotalUPC}</td>
                    <td class="d-none d-lg-table-cell py-3">${vectorobjCategoria[1].porcentajeAsistenciaTotalUPC} %</td>
                </tr>
                  <tr>
                    <td class="py-3">${vectorobjCategoria[2].categoria}</td>
                    <td class="d-none d-md-table-cell py-3">$ ${vectorobjCategoria[2].ingresoTotalUPC}</td>
                    <td class="d-none d-lg-table-cell py-3">${vectorobjCategoria[2].porcentajeAsistenciaTotalUPC} %</td>
                </tr>
                  <tr>
                    <td class="py-3">${vectorobjCategoria[3].categoria}</td>
                    <td class="d-none d-md-table-cell py-3">$ ${vectorobjCategoria[3].ingresoTotalUPC}</td>
                    <td class="d-none d-lg-table-cell py-3">${vectorobjCategoria[3].porcentajeAsistenciaTotalUPC} %</td>
                </tr>
                  <tr>
                    <td class="py-3">${vectorobjCategoria[4].categoria}</td>
                    <td class="d-none d-md-table-cell py-3">$ ${vectorobjCategoria[4].ingresoTotalUPC}</td>
                    <td class="d-none d-lg-table-cell py-3">${vectorobjCategoria[4].porcentajeAsistenciaTotalUPC} %</td>
                </tr>
                  <tr>
                    <td class="py-3">${vectorobjCategoria[5].categoria}</td>
                    <td class="d-none d-md-table-cell py-3">$ ${vectorobjCategoria[5].ingresoTotalUPC}</td>
                    <td class="d-none d-lg-table-cell py-3">${vectorobjCategoria[5].porcentajeAsistenciaTotalUPC} %</td>
                </tr>
                  <tr>
                    <td class="py-3">${vectorobjCategoria[6].categoria}</td>
                    <td class="d-none d-md-table-cell py-3">$ ${vectorobjCategoria[6].ingresoTotalUPC}</td>
                    <td class="d-none d-lg-table-cell py-3">${vectorobjCategoria[6].porcentajeAsistenciaTotalUPC} %</td>
                </tr>
    
             
            </tbody>
           
            <thead class="table-section-header table-primary">
                <tr>
                    <th colspan="3">Past events statistics by category</th>
                </tr>
            </thead>
            <thead class="table-header table-secondary">
                <tr>
                    <th>Categories</th>
                    <th class="d-none d-md-table-cell">Revenues</th> 
                    <th class="d-none d-lg-table-cell">Percentage of assistance</th> 
                </tr>
            </thead>
              <tbody>
                <tr>
                    <td class="py-3">${vectorobjCategoria[0].categoria}</td>
                    <td class="d-none d-md-table-cell py-3">$ ${vectorobjCategoria[0].ingresoTotalPAST}</td>
                    <td class="d-none d-lg-table-cell py-3">${vectorobjCategoria[0].porcentajeAsistenciaTotalPAST} %</td>
                </tr>
                  <tr>
                    <td class="py-3">${vectorobjCategoria[1].categoria}</td>
                    <td class="d-none d-md-table-cell py-3">$ ${vectorobjCategoria[1].ingresoTotalPAST}</td>
                    <td class="d-none d-lg-table-cell py-3">${vectorobjCategoria[1].porcentajeAsistenciaTotalPAST} %</td>
                </tr>
                  <tr>
                    <td class="py-3">${vectorobjCategoria[2].categoria}</td>
                    <td class="d-none d-md-table-cell py-3">$ ${vectorobjCategoria[2].ingresoTotalPAST}</td>
                    <td class="d-none d-lg-table-cell py-3">${vectorobjCategoria[2].porcentajeAsistenciaTotalPAST} %</td>
                </tr>
                  <tr>
                    <td class="py-3">${vectorobjCategoria[3].categoria}</td>
                    <td class="d-none d-md-table-cell py-3">$ ${vectorobjCategoria[3].ingresoTotalUPC}</td>
                    <td class="d-none d-lg-table-cell py-3">${vectorobjCategoria[3].porcentajeAsistenciaTotalPAST} %</td>
                </tr>
                  <tr>
                    <td class="py-3">${vectorobjCategoria[4].categoria}</td>
                    <td class="d-none d-md-table-cell py-3">$ ${vectorobjCategoria[4].ingresoTotalPAST}</td>
                    <td class="d-none d-lg-table-cell py-3">${vectorobjCategoria[4].porcentajeAsistenciaTotalPAST} %</td>
                </tr>
                  <tr>
                    <td class="py-3">${vectorobjCategoria[5].categoria}</td>
                    <td class="d-none d-md-table-cell py-3">$ ${vectorobjCategoria[5].ingresoTotalPAST}</td>
                    <td class="d-none d-lg-table-cell py-3">${vectorobjCategoria[5].porcentajeAsistenciaTotalPAST} %</td>
                </tr>
                  <tr>
                    <td class="py-3">${vectorobjCategoria[6].categoria}</td>
                    <td class="d-none d-md-table-cell py-3">$ ${vectorobjCategoria[6].ingresoTotalUPC}</td>
                    <td class="d-none d-lg-table-cell py-3">${vectorobjCategoria[6].porcentajeAsistenciaTotalUPC} %</td>
                </tr>
    
             
            </tbody>
        `
        contenedorTabla.appendChild(tablaStats)
    })
    .catch(e => console.log(e))

// funciones y procedimientos
function calcularIngresoCategoria(eventos, categoria, fechaActual) {
    let ingresoTotalPAST = 0
    let asistenciaTotalPAST = 0
    let capacidadTotalPAST = 0
    let ingresoTotalUPC = 0
    let asistenciaTotalUPC = 0
    let capacidadTotalUPC = 0
    
    let eventosPorCategoria = eventos.filter(element => element.category == categoria)

    eventosPorCategoria.forEach(event => {
        let eventDate = new Date(event.date)
        if (fechaActual > eventDate) {
            let ingresoPAST = event.price * (event.assistance || 0)
            ingresoTotalPAST += ingresoPAST
            asistenciaTotalPAST += (event.assistance || 0)
            capacidadTotalPAST += event.capacity
        } else if (fechaActual < eventDate) {
            let ingresoUPC = event.price * (event.estimate || 0)
            ingresoTotalUPC += ingresoUPC
            asistenciaTotalUPC += (event.estimate || 0)
            capacidadTotalUPC += event.capacity
        }
    })
    
    let porcentajeAsistenciaTotalPAST = capacidadTotalPAST ? (asistenciaTotalPAST / capacidadTotalPAST) * 100 : 0
    let porcentajeAsistenciaTotalUPC = capacidadTotalUPC ? (asistenciaTotalUPC / capacidadTotalUPC) * 100 : 0
    
    return {
        categoria: categoria,
        ingresoTotalPAST: ingresoTotalPAST,
        porcentajeAsistenciaTotalPAST: porcentajeAsistenciaTotalPAST,
        ingresoTotalUPC: ingresoTotalUPC,
        porcentajeAsistenciaTotalUPC: porcentajeAsistenciaTotalUPC
    }
}

function calcularAsistencia(vector){
    let eventoMayorAsistencia = vector[0]
    let eventoMenorAsistencia = vector[0]
    let eventoMayorCapacidad = vector[0]
    vector.forEach(element => {
        let PorAsistenciaActual = element.PorcentajeAsistencia
        let capacidadActual = element.capacity
        if (PorAsistenciaActual > eventoMayorAsistencia.PorcentajeAsistencia) {
            eventoMayorAsistencia = element
        }
        if (PorAsistenciaActual < eventoMenorAsistencia.PorcentajeAsistencia) {
            eventoMenorAsistencia = element
        }
        if (capacidadActual > eventoMayorCapacidad.capacity) {
            eventoMayorCapacidad = element
        }
    })
     return {
        mayorAsistencia: eventoMayorAsistencia,
        menorAsistencia: eventoMenorAsistencia,
        mayorCapacidad: eventoMayorCapacidad

     }
}
