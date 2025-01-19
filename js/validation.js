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
            agree: "required",

            rut: {
                required: true,
                minlength: 7, // Mínimo 7 caracteres
                maxlength: 8, // Máximo 8 caracteres
                digits: true // Solo números
            },
            dv: {
                required: true,
                maxlength: 1, // Máximo 1 carácter
                pattern: "[0-9kK]" // Solo un número o las letras K/k
            }
        },
        messages: {
            firstname: {
                required: "-Por favor Introduzca su Nombre",
                minlength: "Su Nombre tiene que ser de Minimo 2 caracteres"
            },
            lastname: {
                required: "-Por favor Introduzca su Apellido",
                minlength: "-Su Apellido tiene que ser de Minimo 2 caracteres"
            },
            password: {
                required: "-Por favor Introduzca una Contraseña",
                minlength: "-Su contraseña debe tener minimo 5 caracteres"
            },
            confirm_password: {
                required: "-Por favor Introduzca una Contraseña",
                minlength: "-Su contraseña debe tener minimo 5 caracteres",
                equalTo: "-Su contraseña debe ser igual a la de arriba"
            },
            email: "-Introduzca un Correo Valido",
            agree: "-Acepte nuestras Condiciones",
            
            rut: {
                required: "-Por favor Introduzca su Rut",
                minlength: "-Mínimo 7 caracteres",
                maxlength: "-Máximo 8 caracteres", 
                digits: "-Solo números"
            },
            dv: {
                required: "-Por favor Introduzca su dv",
                maxlength: "-Máximo 1 carácter", // Máximo 1 carácter
                pattern: "-Solo un número o las letras K/k" 
            }
        },
        invalidHandler: function(event, validator) {
            $('#error-list').empty();
            
            if (validator.numberOfInvalids()) {
                $('#error-message').show();
                
                $.each(validator.invalid, function(fieldName, message) {
                    $('#error-list').append('<li>' + message + '</li>');
                });
            }
        }
    });

    $("#username").focus(function() {
        var firstname = $("#firstname").val();
        var lastname = $("#lastname").val();
        if (firstname && lastname && !this.value) {
            this.value = firstname + "." + lastname;
        }
    });




    //validacion rut

    // Validar RUT con dígito verificador
    function validarRutCompleto() {
        const rut = $("#rut").val();
        const dv = $("#dv").val();

        if (!rut || !dv) return false;

        let suma = 0;
        let multiplicador = 2;

        // Calcular el dígito verificador
        for (let i = rut.length - 1; i >= 0; i--) {
            suma += rut[i] * multiplicador;
            multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
        }

        const resto = suma % 11;
        const dvCalculado = resto === 0 ? '0' : resto === 1 ? 'k' : (11 - resto).toString();

        return dv.toLowerCase() === dvCalculado;
    }

    // Agregar método personalizado de jQuery Validation para el RUT
    $.validator.addMethod("validRut", function(value, element) {
        return validarRutCompleto();
    }, "El RUT ingresado no es válido.");

    // Agregar validación del RUT completo
    $("#signupForm").validate({
        rules: {
            rut: {
                validRut: true
            }
        }
    });
});


