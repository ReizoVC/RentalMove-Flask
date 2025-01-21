document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form[data-precio-dia]');
    const fechaInicioInput = document.getElementById('fecha_inicio');
    const fechaFinInput = document.getElementById('fecha_fin');
    const precioTotalSpan = document.getElementById('precio_total');
    const precioPorDia = parseFloat(form.getAttribute('data-precio-dia'));

    function calcularPrecioTotal() {
        const fechaInicio = new Date(fechaInicioInput.value);
        const fechaFin = new Date(fechaFinInput.value);
        if (fechaInicio && fechaFin && fechaFin > fechaInicio) {
            const dias = (fechaFin - fechaInicio) / (1000 * 60 * 60 * 24);
            const precioTotal = dias * precioPorDia;
            precioTotalSpan.textContent = precioTotal.toFixed(2);
        } else {
            precioTotalSpan.textContent = '0.00';
        }
    }

    fechaInicioInput.addEventListener('change', calcularPrecioTotal);
    fechaFinInput.addEventListener('change', calcularPrecioTotal);
});



const btnAbrirAlquiler = document.getElementById('openModal')
const btnCerrarAlquiler = document.getElementById('closeModal')

const modalAlquiler = document.getElementById('alquilar-Modal')

btnAbrirAlquiler.addEventListener('click', function(event) {
    event.preventDefault();
    modalAlquiler.style.display = 'flex';
});

btnCerrarAlquiler.addEventListener('click', () => {
    modalAlquiler.style.display = 'none';
});