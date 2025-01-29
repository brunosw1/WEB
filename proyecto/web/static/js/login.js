$(document).ready(function() {
    $.validator.setDefaults({
        submitHandler: function(form) {
            // Cifrar la contraseña antes de enviarla
            var password = $("#password").val();
            var hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
            $("#password").val(hashedPassword);  // Sustituir la contraseña con su hash
            
            form.submit();  // Enviar el formulario
        }
    });

    
    $("#loginForm").validate({
        rules: {
            email: {
                required: true,
                email: true  // Validar que el correo tenga un formato correcto
            },
            password: {
                required: true,
                minlength: 5  // Validar que la contraseña tenga al menos 5 caracteres
            }
        },
        messages: {
            email: {
                required: "-Por favor Introduzca su Correo electrónico",
                email: "-Por favor Introduzca un Correo válido"
            },
            password: {
                required: "-Por favor Introduzca su Contraseña",
                minlength: "-La contraseña debe tener al menos 5 caracteres"
            }
        }
    });
});