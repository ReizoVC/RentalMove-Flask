var dom = document.getElementById('monthGraphic');
var myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
});
var app = {};

var option;

let xAxisData = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sept', 'Oct', 'Nov', 'Dic'];
let data1 = [];
let data2 = [];
let data3 = [];
for (let i = 0;  i < 12; i++) {
    data1.push(+(Math.random() * 2).toFixed(2));
    data2.push(+(Math.random() * 5).toFixed(2));
    data3.push(+(Math.random() + 0.3).toFixed(2));
}
var emphasisStyle = {
    itemStyle: {
        shadowBlur: 10,
        shadowColor: 'rgba(0,0,0,0.3)'
    }
};
option = {
    color: ['#CB3CFF', '#0E43FB', '#00C2FF'],
    legend: {
        data: [
            { name: 'Económicos', icon: 'circle' },
            { name: 'Lujosos', icon: 'circle' },
            { name: 'Excéntricos', icon: 'circle' }
        ],
        left: '10%',
        textStyle: {
            color: 'white'
        },
        selectedMode: 'multiple',
        selected: {
            'Económicos': true,
            'Lujosos': true,
            'Excéntricos': true
        },
        inactiveColor: 'gray'
    },
    toolbox: {
        feature: {
            magicType: {
                type: ['stack'],
                option: {
                    stack: {
                        barWidth: '15%'
                    }
                }
            },
            dataView: {}
        }
    },
    tooltip: {},
    xAxis: {
        data: xAxisData,
        axisLine: { show: false },
        splitLine: { show: false },
        splitArea: { show: false },
        axisLabel: {
            interval: 0,
            fontSize: 10
        },
        axisTick: { show: false }
    },
    yAxis: {
        splitLine: { show: false }
    },
    grid: {
        bottom: 30,
        left: '5%'
    },
    series: [
        {
            name: 'Económicos',
            type: 'bar',
            stack: 'one',
            barWidth: 10, 
            emphasis: emphasisStyle,
            data: data1
        },
        {
            name: 'Lujosos',
            type: 'bar',
            stack: 'one',
            barWidth: 10,
            emphasis: emphasisStyle,
            data: data2
        },
        {
            name: 'Excéntricos',
            type: 'bar',
            stack: 'two',
            barWidth: 10,
            emphasis: emphasisStyle,
            data: data3
        }
    ]
};
if (option && typeof option === 'object') {
    myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);
