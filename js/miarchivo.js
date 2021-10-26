const episodios = "../data/episodios.json"
    

$(document).ready(function(){

    // EPISODIOS
    $.get(episodios, function(respuesta,estado) {

        if(estado === "success") {
            let datos = respuesta;
            for (const dato of datos) {
                $('#episodios').append(`
                <div class="card m-1 mt-3 text-center" style="width: 18rem;">
                    <img src="${dato.img}" class="card-img-top" alt="${dato.nombre}">
                    <div class="card-body">
                    <h5 class="card-title">${dato.nombre}</h5>
                    <p class="mb-5 card-text">${dato.descripcion}.</p>
                    <div class="btnEp">
                    <a href="${dato.link}" target="_blank" class="botonEp btn btn-primary">Escuchar</a>
                    </div>
                    </div>
                </div>
                `)
            }
        }
    })
})