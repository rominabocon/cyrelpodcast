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

    // CONTACTO
    $('#contacto').append(`
        <form id="formContacto" action="" class="m-4">
            <label for="nombre" class="form-label">Nombre</label>
            <input class="form-control" name="nombre" id="nombre" type="text" >
            <label for="apellido" class="form-label">Apellido</label>
            <input class="form-control" name="apellido" id="apellido" type="text" placeholder="Apellido">
            <label for="telefono" class="form-label">Telefono</label>
            <input class="form-control" name="telefono" id="tel" type="number" placeholder="Teléfono">
            <label for="email" class="form-label">Email</label>
            <input class="form-control" name="email" id="email" type="text" placeholder="Email">
            <textarea name="comentario" class="form-control" placeholder="escribe aquí tu comentario"></textarea>
                <div id="btnEnviarForm">
                    <input type="submit" value="Enviar" class="btn btn-primary"></input>
                </div>
        </form>        
    `)





})