var domDaily = document.getElementById('daygraphic');
var myChartDaily = echarts.init(domDaily, null, {
    renderer: 'canvas',
    useDirtyRect: false
});
var app = {};

var valueEcon = 0;
var valueLuj = 200;
var valueExc = 300;
var total = valueEcon + valueLuj + valueExc;

option = {
    polar: {
        radius: ['20%', '80%'],
        center: ['50%', '50%']
    },
    angleAxis: {
        max: 100,
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
            { value: valueExc ? (valueExc / (total || 1) * 100).toFixed(2) : 0, itemStyle: { color: '#00C2FF' }, name: 'Excéntricos' },
            { value: valueLuj ? (valueLuj / (total || 1) * 100).toFixed(2) : 0, itemStyle: { color: '#0E43FB' }, name: 'Lujosos'},
            { value: valueEcon ? (valueEcon / (total || 1) * 100).toFixed(2) : 0, itemStyle: { color: '#CB3CFF' }, name: 'Económicos' }
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
    valueEcon = dailyIncome;
    total = valueEcon + valueLuj + valueExc;
    const econPercentage = valueEcon ? (valueEcon / total * 100).toFixed(2) : 0;
    const lujPercentage = valueLuj ? (valueLuj / total * 100).toFixed(2) : 0;
    const excPercentage = valueExc ? (valueExc / total * 100).toFixed(2) : 0;
    option.series.data[2].value = Math.max((valueEcon / total * 100).toFixed(2), 1);
    option.graphic.elements[0].style.text = total;
    myChartDaily.setOption(option);
    document.querySelector('.propiedades p:nth-child(1) span').textContent = `${econPercentage}%`;
    document.querySelector('.propiedades p:nth-child(2) span').textContent = `${lujPercentage}%`;
    document.querySelector('.propiedades p:nth-child(3) span').textContent = `${excPercentage}%`;
});

window.addEventListener('resize', myChartDaily.resize);
