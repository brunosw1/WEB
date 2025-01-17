$.validator.setDefaults({
    submitHandler: function() {
        alert("Registro Exitoso");
    }
});

$().ready(function() {
    // validate signup form on keyup and submit
    $("#signupForm").validate({
        rules: {
            firstname:{
                required: true,
                minlength: 2,
            },
            lastname: {
                required: true,
                minlength: 2,
            },
            password: {
                required: true,
                minlength: 5
            },
            confirm_password: {
                required: true,
                minlength: 5,
                equalTo: "#password"
            },
            email: {
                required: true,
                email: true
            },
            topic: {
                required: "#newsletter:checked"
            },
            agree: "required"
        },
        messages: {
            firstname: {
                required: "Por favor Introduzca su Nombre",
                minlength: "Su Nombre tiene que ser de Minimo 2 caracteres"
            },
            lastname: {
                required: "Por favor Introduzca su Apellido",
                minlength: "Su Apellido tiene que ser de Minimo 2 caracteres"
            },
            password: {
                required: "Por favor Introduzca una Contraseña",
                minlength: "Su contraseña debe tener minimo 5 caracteres"
            },
            confirm_password: {
                required: "Por favor Introduzca una Contraseña",
                minlength: "Su contraseña debe tener minimo 5 caracteres",
                equalTo: "Su contraseña debe ser igual a la de arriba"
            },
            email: "Introduzca un Correo Valido",
            agree: "Acepte nuestras Condiciones",
        },
        // Mostrar errores específicos cuando no pase la validación
        invalidHandler: function(event, validator) {
            // Limpiar cualquier mensaje de error previo
            $('#error-list').empty();
            
            // Si hay errores, mostrarlos en el contenedor
            if (validator.numberOfInvalids()) {
                // Mostrar el contenedor de errores
                $('#error-message').show();
                
                // Recorrer los errores y agregarlos a la lista
                $.each(validator.invalid, function(fieldName, message) {
                    $('#error-list').append('<li>' + message + '</li>');
                });
            }
        }
    });

    // propose username by combining first- and lastname
    $("#username").focus(function() {
        var firstname = $("#firstname").val();
        var lastname = $("#lastname").val();
        if (firstname && lastname && !this.value) {
            this.value = firstname + "." + lastname;
        }
    });

});