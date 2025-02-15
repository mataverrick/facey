$(document).ready(function () {
    const $loginForm = $("#loginForm");
    const $usernameInput = $("#username");
    const $passwordInput = $("#password");
    const $rememberMeCheckbox = $("#rememberMe");
    const $usernameError = $("#usernameError");
    const $passwordError = $("#passwordError");

    if (localStorage.getItem("rememberedUser")) {
        $usernameInput.val(localStorage.getItem("rememberedUser"));
        $rememberMeCheckbox.prop("checked", true);
    }

    $loginForm.submit(function (event) {
        event.preventDefault(); 
        let isValid = true;

        $usernameError.addClass("d-none").fadeOut();
        $passwordError.addClass("d-none").fadeOut();

        const username = $usernameInput.val().trim();
        const password = $passwordInput.val().trim();

        if (username === "") {
            $usernameError.removeClass("d-none").fadeIn();
            isValid = false;
        }
        if (password.length < 8) {
            $passwordError.text("La contraseña debe tener al menos 8 caracteres").removeClass("d-none").fadeIn();
            isValid = false;
        }

        if (!isValid) return;

        const demoUser = "admin";
        const demoPassword = "12345678"; 

        if (username === demoUser && password === demoPassword) {
            if ($rememberMeCheckbox.is(":checked")) {
                localStorage.setItem("rememberedUser", username);
            } else {
                localStorage.removeItem("rememberedUser");
            }

            window.location.href = "home.html";
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    });
});
$(document).ready(function () {
    $("#registerForm").submit(function (event) {
        event.preventDefault(); 

        $(".text-danger").remove(); 

        let isValid = true;
        let username = $("#username").val().trim();
        let email = $("#email").val().trim();
        let name = $("#name").val().trim();
        let password = $("#password").val().trim();
        let confirmPassword = $("#confirmPassword").val().trim();
        let gender = $("#gender").val();
        let birthdate = $("#birthdate").val();

        if (username === "") {
            $("#username").after('<div class="text-danger small">El usuario es obligatorio.</div>');
            isValid = false;
        }

        let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (email === "") {
            $("#email").after('<div class="text-danger small">El correo es obligatorio.</div>');
            isValid = false;
        } else if (!emailPattern.test(email)) {
            $("#email").after('<div class="text-danger small">Ingrese un correo válido.</div>');
            isValid = false;
        }

        
        if (name === "") {
            $("#name").after('<div class="text-danger small">El nombre es obligatorio.</div>');
            isValid = false;
        }

        if (password === "") {
            $("#password").after('<div class="text-danger small">La contraseña es obligatoria.</div>');
            isValid = false;
        } else if (password.length < 8) {
            $("#password").after('<div class="text-danger small">La contraseña debe tener al menos 8 caracteres.</div>');
            isValid = false;
        }

        if (confirmPassword === "") {
            $("#confirmPassword").after('<div class="text-danger small">Debe confirmar su contraseña.</div>');
            isValid = false;
        } else if (password !== confirmPassword) {
            $("#confirmPassword").after('<div class="text-danger small">Las contraseñas no coinciden.</div>');
            isValid = false;
        }

        if (gender === "") {
            $("#gender").after('<div class="text-danger small">Seleccione su género.</div>');
            isValid = false;
        }

        
        if (birthdate === "") {
            $("#birthdate").after('<div class="text-danger small">La fecha de nacimiento es obligatoria.</div>');
            isValid = false;
        } else {
            let birthDateObj = new Date(birthdate);
            let today = new Date();
            let age = today.getFullYear() - birthDateObj.getFullYear();
            let monthDiff = today.getMonth() - birthDateObj.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
                age--;
            }
            if (age < 18) {
                $("#birthdate").after('<div class="text-danger small">Debes tener al menos 18 años.</div>');
                isValid = false;
            }
        }

        if (isValid) {
            alert("✅ Registro exitoso. Redirigiendo al inicio de sesión...");
            window.location.href = "login.html"; 
        }
    });

    $("#gender").change(function () {
        if ($(this).val() === "Otro") {
            $("#otherGender").removeClass("d-none").focus();
        } else {
            $("#otherGender").addClass("d-none").val("");
        }
    });
});
