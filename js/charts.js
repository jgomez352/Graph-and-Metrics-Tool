// JavaScript source code

var ctx = document.getElementById('myChart').getContext('2d');
let dataNumbers = [100, 190, 30, 350, 20, 30];
let dataLabels = ['Good Standing','30 to 89 Days','90 to 119 Days','120 to 179 Days','180 to 364 Days','365 and Over'];
let dataHeader = 'LTIs'
window.chartColors = {
    red: 'rgb(255, 0, 54, 0.7)',
    orange: 'rgb(255, 159, 64, 0.3)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(0, 178, 117, 0.3)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};
window.chartBorderColors = {
    red: 'rgb(255, 0, 54, 1.0)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(0, 178, 117)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};


var myChart = new Chart(ctx, {
    type: 'bar', 
    data: {
        // labels: dataLabels,
        datasets: [{
            label: dataHeader,
            //data: dataNumbers,
            backgroundColor: [
                window.chartColors.green,
                window.chartColors.orange,
                window.chartColors.orange,
                window.chartColors.orange,
                window.chartColors.orange,
                window.chartColors.orange
            ],
            borderColor: [
                window.chartBorderColors.green,
                window.chartBorderColors.red,
                window.chartBorderColors.red,
                window.chartBorderColors.red,
                window.chartBorderColors.red,
                window.chartBorderColors.red
            ],
            borderWidth: 1
        }]
    },
    plugins: [ChartDataSource],
    options: {
        legend: {
            display: true,
        },
        scales: {
            yAxes: [{
                ticks: {

                    beginAtZero: true
                }
            }]
        },
        plugins: {
            datasource: {
                type: 'csv',
                url: 'data/LTIs2.csv',
                delimiter: ',',
                rowMapping: 'dataset',
                datasetLabels: true,
                indexLabels: true
            }
        }
    }
   
});

function myFilter(index) {
    let ci = myChart;
    let meta;
    let i = 0;
    for (i = 0; i < ci.data.datasets.length; i++) {
        if (i != index) {
            meta = ci.getDatasetMeta(i);
            // See controller.isDatasetVisible comment
            meta.hidden = meta.hidden === null ? !ci.data.datasets[i].hidden : null;
            // We hid a dataset ... rerender the chart
        };
    };
    ci.data.datasets[index].backgroundColor = [
        window.chartColors.green,
        window.chartColors.orange,
        window.chartColors.orange,
        window.chartColors.orange,
        window.chartColors.orange,
        window.chartColors.orange
    ];
    ci.data.datasets[index].borderColor = [
        window.chartBorderColors.green,
        window.chartBorderColors.red,
        window.chartBorderColors.red,
        window.chartBorderColors.red,
        window.chartBorderColors.red,
        window.chartBorderColors.red
    ];
    ci.update();
};
