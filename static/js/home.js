// llamando accionadores del registro

const btnAbrirRegistro = document.getElementById('header-Signin');
const btnCerrarRegistro = document.getElementById('close-register');

const btnAbrirRegistro2 = document.getElementById('form-register-btn');

// llamando accionadores del login
const btnAbrirLogin = document.getElementById('form-login-btn');
const btnCerrarLogin = document.getElementById('close-login');

// llamando modales
const modalRegister = document.getElementById('signinDialog');
const modalLogin = document.getElementById('loginDialog');

//abrir y cerrar modal de registro
btnAbrirRegistro.addEventListener('click', () => {
    modalRegister.style.display = 'flex';
});

btnCerrarRegistro.addEventListener('click', () => {
    modalRegister.style.display = 'none';
});

btnAbrirRegistro2.addEventListener('click', () => {
    modalRegister.style.display = 'flex';
    modalLogin.style.display = 'none';
});

//abrir y cerrar modal de login
btnAbrirLogin.addEventListener('click', () => {
    modalLogin.style.display = 'flex';
    modalRegister.style.display = 'none';
});

btnCerrarLogin.addEventListener('click', () => {
    modalLogin.style.display = 'none';
});




async function submitForm(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: formData
        });
        const result = await response.json();
        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: result.message,
            }).then(() => {
                window.location.href = '/';
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: result.message,
            });

            form.querySelector('#password').value = '';
            form.querySelector('#confirm-password').value = '';
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al enviar el formulario.',
        });

        form.querySelector('#password').value = '';
        form.querySelector('#confirm-password').value = '';
    }
}

// login.js
async function submitFormLogin(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: formData
        });
        const result = await response.json();
        if (result.status === 'success') {
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: result.message,
            }).then(() => {
                window.location.reload();
                // Mostrar el nombre del usuario en el header
                const headerUsername = document.getElementById('header-Username');
                headerUsername.innerText = result.nombre || 'Usuario';

                // Mostrar el botón de logout
                const headerLogoutButton = document.getElementById('header-Logout');
                headerLogoutButton.style.display = 'inline-block';

            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: result.message,
            });

            form.querySelector('#password').value = '';
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al enviar el formulario.',
        });

        form.querySelector('#password').value = '';
    }
}
