var domWeek = document.getElementById('weekGraphic');
var myChartWeek = echarts.init(domWeek, null, {
    renderer: 'canvas',
    useDirtyRect: false
});

var weeklyIncome = JSON.parse(document.getElementById('weekly-income').value);

var optionWeek = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        splitLine: {
            show: false
        },
        axisLine: {
            show:false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            color: '#AEB9E1'
        }
    },
    yAxis: {
        type: 'value',
        splitLine: {
            show: false
        },
        axisLine: {
            show:false
        },
        axisLabel: {
            color: '#AEB9E1'
        }
    },
    series: [
        {
            data: weeklyIncome,
            type: 'line',
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        {
                            offset: 0, color: 'rgba(87, 195, 255, 0.3)'
                        },
                        {
                            offset: 1, color: 'rgba(87, 195, 255, 0.00)'
                        }
                    ],
                    global: false
                }
            },
            symbol: 'none',
            showSymbol: false,
            lineStyle: {
                color: '#00C2FF'
            }
        }
    ]
};

if (optionWeek && typeof optionWeek === 'object') {
    myChartWeek.setOption(optionWeek);
}

window.addEventListener('resize', function() {
    myChartWeek.resize();
});

