// Llamando botones de display
const informeReservBtn = document.getElementById('informeReservaDisplay')
const ingrMensualBtn = document.getElementById('ingresoMensualDisplay')
const gestAutoBtn = document.getElementById('gestionAutosDisplay')
const informeResBtn = document.getElementById('informeResenasDisplay')

// Llamando Reportes
const informeReservReport = document.getElementById('infReservas')
const ingrMensualReport = document.getElementById('ingMensuales')
const gestAutoReport = document.getElementById('gestionAutos')
const informeResReport = document.getElementById('informeResena')


function show(report){
    report.style.display = 'flex';
    setTimeout(() => {
        report.style.transform = 'translate(0)';
        report.style.opacity = '1' 
    }, 10) 
}

function hide(report1, report2, report3){
    report1.style.display = 'none';
    report1.style.transform = 'translate(20px)';
    report1.style.opacity = '.4' 
    report2.style.display = 'none';
    report2.style.transform = 'translate(20px)';
    report2.style.opacity = '.4'
    report3.style.display = 'none';
    report3.style.transform = 'translate(20px)';
    report3.style.opacity = '.4'
}


gestAutoBtn.addEventListener('click', () =>{
    show(gestAutoReport);
    hide(informeReservReport, ingrMensualReport, informeResReport)
})

informeReservBtn.addEventListener('click', () =>{
    show(informeReservReport);
    hide(gestAutoReport, ingrMensualReport, informeResReport)
})

ingrMensualBtn.addEventListener('click', () =>{
    show(ingrMensualReport);
    hide(gestAutoReport, informeReservReport, informeResReport)
})

informeResBtn.addEventListener('click', () =>{
    show(informeResReport);
    hide(gestAutoReport, informeReservReport, ingrMensualReport)
})