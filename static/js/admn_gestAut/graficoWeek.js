var dom = document.getElementById('weekGraphic');
var myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
});

var option = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', '', '', 'Tue', '','Wed',  '','Thu', '', 'Fri', '', 'Sat', '', 'Sun', '', '', ''],
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
            data: [0, 100, 200, 100, 150, 300, 300, 450, 450, 450, 500, 340, 300, 350, 360, 370, 300, 300, 800],
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

if (option && typeof option === 'object') {
    myChart.setOption(option);
}

window.addEventListener('resize', function() {
    myChart.resize();
});

