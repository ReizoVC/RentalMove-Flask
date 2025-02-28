var domDaily = document.getElementById('daygraphic');
var myChartDaily = echarts.init(domDaily, null, {
    renderer: 'canvas',
    useDirtyRect: false
});
var app = {};

// Obtener los valores de ingresos por categoría del campo oculto en el HTML
var valueEcon = parseFloat(document.getElementById('income-economicos').value) || 0;
var valueLuj = parseFloat(document.getElementById('income-lujosos').value) || 0;
var valueExc = parseFloat(document.getElementById('income-excentricos').value) || 0;
var total = valueEcon + valueLuj + valueExc;

console.log('Initial Values:', { valueEcon, valueLuj, valueExc, total });

option = {
    polar: {
        radius: ['20%', '80%'],
        center: ['50%', '50%']
    },
    angleAxis: {
        max: Math.max(total, 100),
        startAngle: 180,
        splitLine: {
            show: false
        },
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            show: false
        },
        interval: 0.5
    },
    radiusAxis: {
        type: 'category',
        data: ['Excéntricos', 'Lujosos', 'Económicos'],
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            show: false
        }
    },
    tooltip: {
        trigger: 'item',
        backgroundColor: '#0B1739',
        textStyle: {
            color: '#fff'
        },
        formatter: function(params) {
            var realValues = [valueExc, valueLuj, valueEcon];
            return params.name + ': ' + realValues[params.dataIndex];
        }
    },
    series: {
        type: 'bar',
        data: [
            { value: valueExc, itemStyle: { color: '#00C2FF' }, name: 'Excéntricos' },
            { value: valueLuj, itemStyle: { color: '#0E43FB' }, name: 'Lujosos'},
            { value: valueEcon, itemStyle: { color: '#CB3CFF' }, name: 'Económicos' }
        ],
        coordinateSystem: 'polar',
        barWidth: 10,
        stack: 'total',
        label: {
            show: false
        }
    },
    graphic: {
        elements: [
            {
                type: 'text',
                left: 'center',
                top: 'center',
                style: {
                    text: total,
                    fontSize: 20,
                    fontWeight: 'bold',
                    fill: '#fff' // Cambiar el color del texto a blanco
                }
            }
        ]
    }
};

if (option && typeof option === 'object') {
    myChartDaily.setOption(option);
}

document.addEventListener('updateDailyIncome', (event) => {
    const dailyIncome = event.detail.dailyIncome;
    valueEcon = dailyIncome.economicos;
    valueLuj = dailyIncome.lujosos;
    valueExc = dailyIncome.excentricos;
    total = valueEcon + valueLuj + valueExc;
    console.log('Updated Values:', { valueEcon, valueLuj, valueExc, total });
    
    // Actualizar los valores de la serie
    option.series.data = [
        { value: valueExc, itemStyle: { color: '#00C2FF' }, name: 'Excéntricos' },
        { value: valueLuj, itemStyle: { color: '#0E43FB' }, name: 'Lujosos'},
        { value: valueEcon, itemStyle: { color: '#CB3CFF' }, name: 'Económicos' }
    ];
    
    // Actualizar el texto del gráfico
    option.graphic.elements[0].style.text = total;
    
    // Aplicar la opción actualizada al gráfico
    myChartDaily.setOption(option);
});

window.addEventListener('resize', () => {
    myChartDaily.resize();
});
