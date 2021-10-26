class Contacto {
    constructor(nombre, apellido, telefono, email, comentario) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.email = email;
        this.comentario = comentario;
    }
}

class Usuario {
    constructor(name, adress, email, password) {
        this.name = name;
        this.adress = adress;
        this.email = email;
        this.password = password;
    }
}

$(document).ready(function(){

    $("#formContacto").submit(function() {
        $("#log").append(`<p class="text-center m-3">Tu formulario se ha enviado con exito</p>`);
        // Cancelamos el envío
        return false;
    })

});