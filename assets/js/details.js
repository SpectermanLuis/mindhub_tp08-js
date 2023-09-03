mostrarDetails()

function mostrarDetails() {
    if (document.title == "Details") {
        const queryString = location.search
        const params = new URLSearchParams(queryString)
        const _id = params.get("_id")
        let eventoEncontrado = data.events.find((evento) => evento._id == _id)
        crearDetailsEvento(eventoEncontrado, detalle)
    }

}


function crearDetailsEvento(evento, ubicacion) {
    let detalleEvento = ""

    detalleEvento = `<div class="d-flex col-md-4 col-sm-12 align-items-center justify-content-center">
    <img src="${evento.image}"
        class="img-fluid card-img-2 card-img-top mt-2 object-fit-cover" alt="...">
</div>

<div class="col-md-8 col-sm-12">
    <div class="card-body p-3 bg-body-secondary mt-5 mb-1">

        <div class="container mt-3">

            <div class="row">

                <div class="col-12 col-md-3">
                    <span class="span-negrita">Category</span>
                </div>

                <div class="col-12 col-md-9">
                    <p>${evento.category}</p>
                </div>

                <div class="col-12 col-md-3">
                    <span class="span-negrita">Name</span>
                </div>

                <div class="col-12 col-md-9">
                    <p>${evento.name}</p>
                </div>

                <div class="col-12 col-md-3">
                    <span class="span-negrita">Description</span>
                </div>

                <div class="col-12 col-md-9">
                    <p>${evento.description}</p>
                </div>

                <div class="col-12 col-md-3">
                    <span class="span-negrita">Place</span>
                </div>

                <div class="col-12 col-md-9">
                    <p>${evento.place}</p>
                </div>

                <div class="col-12 col-md-3">
                    <span class="span-negrita">Date</span>
                </div>

                <div class="col-12 col-md-9">
                    <p>${evento.date}</p>
                </div>

                <div class="col-12 col-md-3">
                    <span class="span-negrita">Price</span>
                </div>

                <div class="col-12 col-md-9">
                    <p>U$S ${evento.price}</p>
                </div>

            </div>
         </div>
    </div>
</div>

  `
    ubicacion.innerHTML = detalleEvento
}
