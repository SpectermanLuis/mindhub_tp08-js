
let contenido = document.querySelector("#contenedor_tarjetas")
let chekboxesContenedor = document.querySelector("#contenedor-checkboxes")

function crearMostrarCheckboxes(arregloEventos, ubicacion) {
  let checkboxes = ""

  let categoriasUnicas = []

  let soloCategorias = arregloEventos.map(evento => evento.category)

  soloCategorias.forEach(categoria => {
    if (!categoriasUnicas.includes(categoria)) {
      categoriasUnicas.push(categoria)
    }

    // crear los checkboxes

    let checkboxes = ""
    for (categoria of categoriasUnicas) {
      checkboxes += `<div class="form-check form-switch col-12 col-sm-12 col-md-5">
<input value="${categoria}" class="form-check-input" type="checkbox" role="switch" id="${categoria}">
<label class="form-check-label" for="${categoria}">
  ${categoria}</label>
</div>`

    }

    ubicacion.innerHTML = checkboxes

  })
}

function crearArregloEventosBase(data) {

  let arregloEventosNecesarios=[] 
  if (document.title === "Index") {
     arregloEventosNecesarios = data.events
  } else if (document.title === "Upcoming_Events") {
    arregloEventosNecesarios = data.events.filter(evento=>evento.date>=data.currentDate)
  } else if (document.title === "Past_Events") {
    arregloEventosNecesarios = data.events.filter(evento=>evento.date<data.currentDate)
  }

  return arregloEventosNecesarios
}


function crearMostrarTarjetas(arregloEventos, ubicacion) {

  let tarjetas = ""

  for (evento of arregloEventos) {
    tarjetas += `<div class="card col-md-3">
        <img src=" ${evento.image}" class="card-img card-img-top mt-1 object-fit-cover" alt="...">

        <div class="card-body">
          <h5 class="card-title">${evento.name}</h5>
          <p class="card-text">${evento.description}</p>

            <div class="row">

              <div class="col-3 p-0">
                <h4 class="mb-0">Date</h4>
              </div>
  
              <div class="col-5 justify-content-center d-flex p-md-2 pt-1 justify-content-md-start">
                <h6 class="mb-0">${evento.date}</h6>
              </div>
    
            </div>


          <div class="row">

            <div class="col-3 p-0">
              <h4 class="mb-0">Price</h4>
            </div>

            <div class="col-4 justify-content-center d-flex p-md-2 pt-1 justify-content-md-start">
              <h6 class="mb-0">U$S ${evento.price}</h6>
          </div>`

         if(document.title==='Index'){

          tarjetas = tarjetas +          
          `<div class="col-4">
              <a href="./assets/pages/details.html?_id=${evento._id}" class="btn btn-primary">Details</a>
            </div>
          </div>
        </div>
      </div>`
         } else {
          tarjetas = tarjetas +          
          `<div class="col-4">
              <a href="../../assets/pages/details.html?_id=${evento._id}" class="btn btn-primary">Details</a>
            </div>
          </div>
        </div>
      </div>`
         }

  }

  ubicacion.innerHTML = tarjetas
}

let arregloEventosBase=[]
crearMostrarCheckboxes(data.events, chekboxesContenedor)
arregloEventosBase = crearArregloEventosBase(data)
crearMostrarTarjetas(arregloEventosBase, contenido)

// poner filtros
// volver a crearMostrarTarjetas con arreglo filtrado

const inputTexto = document.querySelector("#texto")
const divChecks = document.getElementById("contenedor-checkboxes")

inputTexto.addEventListener("input", () => { filtroCruzado() })

divChecks.addEventListener("change", filtroCruzado)

function filtroCruzado() {
  console.log(arregloEventosBase)
  let filtradoPorTexto = filtrarPorTexto(arregloEventosBase, inputTexto.value)
  let filtradoPorTextoYCheckboxes = filtrarPorCategoria(filtradoPorTexto)
  crearMostrarTarjetas(filtradoPorTextoYCheckboxes, contenido)
}

function filtrarPorTexto(arregloDeElementos, texto) {
  let elementosFiltrados = arregloDeElementos.filter(elemento => elemento.name.toLowerCase().includes(texto.toLowerCase()))
  return elementosFiltrados
}

function filtrarPorCategoria(arregloDeElementos) {
  let checkboxes = document.querySelectorAll("input[type='checkbox']")
  let arrayCheckboxes = Array.from(checkboxes)
  let checksPrendidos = arrayCheckboxes.filter(check => check.checked)
  let valoresChecks = checksPrendidos.map(check => check.value)
  console.log(valoresChecks)

  if (valoresChecks.length == 0) {
    return arregloDeElementos
  }

  let elementosFiltrados = arregloDeElementos.filter(elemento => valoresChecks.some(categoria => elemento.category.toLowerCase().includes(categoria.toLowerCase())))

  return elementosFiltrados
}

