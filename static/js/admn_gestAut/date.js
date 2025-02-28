const datePopover = document.getElementById('date-popover');
const selectedDateField = document.getElementById('selected-date');

// Seleccionar la fecha actual por defecto
const today = new Date();
const todayISO = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split('T')[0];
datePopover.setAttribute('value', todayISO);
const formattedToday = new Intl.DateTimeFormat('es-ES', { month: 'short', day: '2-digit' }).format(today);
selectedDateField.textContent = `${formattedToday}`;

// Obtener ingresos del día actual
fetch(`/api/daily-income?date=${todayISO}`)
    .then(response => response.json())
    .then(data => {
        const dailyIncome = {
            economicos: data.income_economicos,
            lujosos: data.income_lujosos,
            excentricos: data.income_excentricos
        };
        document.getElementById('income-economicos').value = dailyIncome.economicos;
        document.getElementById('income-lujosos').value = dailyIncome.lujosos;
        document.getElementById('income-excentricos').value = dailyIncome.excentricos;
        console.log(`Daily Income: ${JSON.stringify(dailyIncome)}`); // Imprimir en la consola
        updateDailyIncomeChart(dailyIncome);
    });

document.getElementById('show-calendar').addEventListener('click', () => {
    if (datePopover.style.display === 'none' || !datePopover.style.display) {
        datePopover.style.display = 'flex';
    } else {
        datePopover.style.display = 'none';
    }
});

datePopover.addEventListener('change', (event) => {
    const selectedDate = new Date(event.target.value);
    selectedDate.setMinutes(selectedDate.getMinutes() + selectedDate.getTimezoneOffset());
    const formattedDate = new Intl.DateTimeFormat('es-ES', { month: 'short', day: '2-digit' }).format(selectedDate);
    selectedDateField.textContent = `${formattedDate}`;
    datePopover.style.display = 'none';

    // Solicitar la suma de los precios finales de los préstamos del día seleccionado
    fetch(`/api/daily-income?date=${event.target.value}`)
        .then(response => response.json())
        .then(data => {
            const dailyIncome = {
                economicos: data.income_economicos,
                lujosos: data.income_lujosos,
                excentricos: data.income_excentricos
            };
            document.getElementById('income-economicos').value = dailyIncome.economicos;
            document.getElementById('income-lujosos').value = dailyIncome.lujosos;
            document.getElementById('income-excentricos').value = dailyIncome.excentricos;
            console.log(`Daily Income: ${JSON.stringify(dailyIncome)}`); // Imprimir en la consola
            updateDailyIncomeChart(dailyIncome);
        });
});

function updateDailyIncomeChart(dailyIncome) {
    const event = new CustomEvent('updateDailyIncome', { detail: { dailyIncome } });
    document.dispatchEvent(event);
}

document.addEventListener('click', (event) => {
    if (!datePopover.contains(event.target) && event.target.id !== 'show-calendar') {
        datePopover.style.display = 'none';
    }
});


