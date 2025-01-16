// abrir y cerrar modal
document.addEventListener('DOMContentLoaded', function() {
    const btnAbrirNewUser = document.getElementById('AdminAddNewUser');
    const btnCerrarNewUser = document.getElementById('close-newUser');
    const editUserButtons = document.querySelectorAll('.edit-user-btn');
    
    const modalNewUser  = document.getElementById('newUserDialog')
    
    const userForm = document.getElementById('userForm');
    if (!userForm) {
        console.error('userForm element not found');
        return;
    }
    const userIdInput = document.getElementById('userId');
    const modalTitle = document.getElementById('modalTitle');
    const submitButton = document.getElementById('submitButton');
    const userFormAction = userForm.action;
    
    btnAbrirNewUser.addEventListener('click', () =>{
        userForm.reset();
        userIdInput.value = '';
        userForm.action = userFormAction;
        modalTitle.textContent = 'NUEVO USUARIO';
        submitButton.textContent = 'AGREGAR';
        modalNewUser.style.display = 'flex'
    });
    
    if (editUserButtons.length > 0) {
        editUserButtons.forEach(button => {
            button.addEventListener('click', function() {
                const userId = this.getAttribute('data-id');
                const userNombre = this.getAttribute('data-nombre');
                const userApellido = this.getAttribute('data-apellido');
                const userCorreo = this.getAttribute('data-correo');
                const userContrasena = this.getAttribute('data-contrasena');
                const userNroLicencia = this.getAttribute('data-nroLicencia');
                const userNroDni = this.getAttribute('data-nroDni');
                const userRol = this.getAttribute('data-rol');

                userIdInput.value = userId;
                document.getElementById('nombre').value = userNombre;
                document.getElementById('apellido').value = userApellido;
                document.getElementById('correo').value = userCorreo;
                document.getElementById('contrasena').value = userContrasena;
                document.getElementById('nroLicencia').value = userNroLicencia;
                document.getElementById('nroDni').value = userNroDni;
                document.getElementById('rol').value = userRol;

                userForm.action = "/admin/usuarios/actualizar";
                modalTitle.textContent = 'EDITAR USUARIO';
                submitButton.textContent = 'GUARDAR';
                modalNewUser.style.display = 'flex'
            });
        });
    }
    
    btnCerrarNewUser.addEventListener('click', () =>{
        modalNewUser.style.display = 'none'
    });
    
    window.addEventListener('click', function(event) {
        if (event.target == userModal) {
            modalNewUser.style.display = 'none'
        }
    });
});


// #################Personal#####################

document.addEventListener('DOMContentLoaded', function() {
    const addEmployeeButton = document.getElementById('AdminAddNewEmployee');
    const editEmployeeButtons = document.querySelectorAll('.edit-employee-btn');
    const deleteEmployeeForms = document.querySelectorAll('.delete-employee-form');
    const employeeModal = document.getElementById('newEmployeeDialog');
    const closeBtn = document.getElementById('close-newEmployee');
    const employeeForm = document.querySelector('#newEmployeeDialog form');
    const employeeIdInput = document.createElement('input');
    employeeIdInput.type = 'hidden';
    employeeIdInput.name = 'id';
    employeeForm.appendChild(employeeIdInput);
    const modalTitle = document.querySelector('#newEmployeeDialog .admin-dialog-header h2 span');
    const submitButton = document.querySelector('#newEmployeeDialog .admin-dialog-header button');
    const employeeFormAction = employeeForm.action;

    addEmployeeButton.addEventListener('click', function() {
        employeeForm.reset();
        employeeIdInput.value = '';
        employeeForm.action = employeeFormAction;
        modalTitle.textContent = 'NUEVO EMPLEADO';
        submitButton.textContent = 'AGREGAR';
        employeeModal.style.display = 'flex';
    });

    editEmployeeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const employeeId = this.getAttribute('data-id');
            const employeeNombre = this.getAttribute('data-nombre');
            const employeeApellido = this.getAttribute('data-apellido');
            const employeeCorreo = this.getAttribute('data-correo');
            const employeeContrasena = this.getAttribute('data-contrasena');
            const employeeNroDni = this.getAttribute('data-nroDni');
            const employeeRol = this.getAttribute('data-rol');

            employeeIdInput.value = employeeId;
            document.getElementById('nombre').value = employeeNombre;
            document.getElementById('apellido').value = employeeApellido;
            document.getElementById('correo').value = employeeCorreo;
            document.getElementById('contrasena').value = employeeContrasena;
            document.getElementById('nroDni').value = employeeNroDni;
            document.getElementById('rol').value = employeeRol;

            employeeForm.action = "/admin/personal/actualizar";
            modalTitle.textContent = 'EDITAR EMPLEADO';
            submitButton.textContent = 'GUARDAR';
            employeeModal.style.display = 'flex';
        });
    });

    deleteEmployeeForms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            if (confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
                form.submit();
            }
        });
    });

    closeBtn.addEventListener('click', function() {
        employeeModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == employeeModal) {
            employeeModal.style.display = 'none';
        }
    });
});

// ########################## autos


document.addEventListener('DOMContentLoaded', function() {
    const addAutoButton = document.getElementById('AdminAddNewAuto');
    const editAutoButtons = document.querySelectorAll('.edit-auto-btn');
    const deleteAutoForms = document.querySelectorAll('.delete-auto-form');
    const autoModal = document.getElementById('newAutoDialog');
    const closeBtn = document.getElementById('close-newAuto');
    const autoForm = document.getElementById('autoForm');
    const autoIdInput = document.getElementById('autoId');
    const modalTitle = document.getElementById('modalTitle');
    const submitButton = document.getElementById('submitButton');
    const autoFormAction = autoForm.action;

    addAutoButton.addEventListener('click', function() {
        autoForm.reset();
        autoIdInput.value = '';
        autoForm.action = autoFormAction;
        modalTitle.textContent = 'NUEVO AUTO';
        submitButton.textContent = 'AGREGAR';
        autoModal.style.display = 'flex';
    });

    if (editAutoButtons) {
        editAutoButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (autoForm) {
                    const autoId = this.getAttribute('data-id');
                    const autoMarca = this.getAttribute('data-marca');
                    const autoModelo = this.getAttribute('data-modelo');
                    const autoPlaca = this.getAttribute('data-placa');
                    const autoAño = this.getAttribute('data-año');
                    const autoPrecioDia = this.getAttribute('data-precio_dia');
                    const autoDisponibilidad = this.getAttribute('data-disponibilidad') === 'true';

                    autoIdInput.value = autoId;
                    document.getElementById('marca').value = autoMarca;
                    document.getElementById('modelo').value = autoModelo;
                    document.getElementById('placa').value = autoPlaca;
                    document.getElementById('año').value = autoAño;
                    document.getElementById('precioDia').value = autoPrecioDia;
                    document.getElementById('disponibilidad').value = autoDisponibilidad ? 'true' : 'false';

                    autoForm.action = "/admin/vehiculos/actualizar";
                    if (modalTitle) {
                        modalTitle.textContent = 'EDITAR AUTO';
                    }
                    if (submitButton) {
                        submitButton.textContent = 'GUARDAR';
                    }
                    autoModal.style.display = 'flex';
                }
            });
        });
    }

    deleteAutoForms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            if (confirm('¿Estás seguro de que deseas eliminar este auto?')) {
                form.submit();
            }
        });
    });

    closeBtn.addEventListener('click', function() {
        autoModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == autoModal) {
            autoModal.style.display = 'none';
        }
    });
});

function actualizarInputFile() {
    var filename = this.value ? "'" + this.value.replace(/^.*[\\\/]/, '') + "'" : 'Seleccionar Archivo';
    this.parentElement.style.setProperty('--fn', filename);
    this.parentElement.setAttribute('data-file-selected', this.value ? 'true' : 'false');
}

document.querySelectorAll(".file-select input").forEach((ele) => 
    ele.addEventListener('change', actualizarInputFile)
);