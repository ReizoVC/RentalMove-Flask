var dom = document.getElementById("daygraphic");
var myChart = echarts.init(dom, null, {
    renderer: "canvas",
    useDirtyRect: false,
});
var app = {};

var option;

const gaugeData = [
    {
        value: 80,
        itemStyle: {
            color: '#CB3CFF'
        }
    },
    {
        value: 0,
        itemStyle: {
            color: 'rgba(0, 0, 0, 0)'
        }
    },
    {
        value: 70,
        itemStyle: {
            color: '#0E43FB'
        }
    },
    {
        value: 0,
        itemStyle: {
            color: 'rgba(0, 0, 0, 0)'
        }
    },
    {
        value: 50,
        itemStyle: {
            color: '#00C2FF'
        }
    },
];

option = {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    series: [
        {
            type: "gauge",
            startAngle: 180,
            endAngle: -360,
            pointer: {
                show: false,
            },
            progress: {
                show: true,
                overlap: false,
                roundCap: false,
                clip: false,
                width: 10,
                itemStyle: {
                    backgroundColor: 'rgba(0, 0, 0, 0)' 
                }
            },
            axisLine: {
                lineStyle: {
                    width: 35,
                    color: [
                        [1, 'rgba(0, 0, 0, 0)'] 
                    ]
                },
            },
            splitLine: {
                show: false,
                distance: 0,
                length: 10,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: false,
                distance: 50,
            },
            data: gaugeData,
            title: {
                fontSize: 14,
            },
            detail: {
                width: 50,
                height: 14,
                fontSize: 25,
                formatter: '150K',
                offsetCenter: ['0%', '10%'],
                color: "#fff",
            },
        },
    ],
};

if (option && typeof option === "object") {
    myChart.setOption(option);
}
window.addEventListener("resize", myChart.resize);


document.getElementById("ingresoMensualDisplay").addEventListener("click", function() {
    myChart.dispose();
    myChart = echarts.init(dom, null, {
        renderer: "canvas",
        useDirtyRect: false,
    });
    myChart.setOption(option);
});
