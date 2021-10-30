const episodios = "../data/episodios.json";


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
                    <a href="${dato.link}" target="_blank" class="botonEp btn btn-outline-dark">Escuchar</a>
                    </div>
                    </div>
                </div>
                `)
            }
        }
    })
     
    // CONTACTO
    var Capturar = function(){
        let lstNumero = document.getElementsByClassName("form-control"),
        comentsForm = [];  
        for (var i = 0; i < lstNumero.length; i++) {    
            comentsForm[i] = lstNumero[i].value;
            console.log (lstNumero[i].value);     
            }
        localStorage.setItem('form', JSON.stringify(comentsForm));       
        }

    $('#enviarForm').click((e) => {
        e.preventDefault();

        if($('input').value != '') {
            return(
            Swal.fire(
            '¡Compra Realizada!',
            'Nos estaremos comunicando contigo para informarte los pasos a seguir',
            'success').then(function(result){
            if (result.isConfirmed)
            Capturar();
           
            var guardando = localStorage.getItem('form')
            console.log(guardando)
            location.reload();
            })
            )
          }else {
            return (
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El carrito esta vacio!',
                footer: 'Agrega productos para continuar'
              })
            )
          }
        
        
    })


})