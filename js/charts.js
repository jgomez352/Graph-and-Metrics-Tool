// JavaScript source code

//let dataNumbers = [100, 190, 30, 350, 20, 30];
//let dataLabels = ['Good Standing','30 to 89 Days','90 to 119 Days','120 to 179 Days','180 to 364 Days','365 and Over'];
//let dataHeader = 'LTIs'

//Charts parameters
setTimeout(chartsMaker, 0);

let chartsDiv,
    chartsIDs = ['LTIVMT'],
    chartsH2s = ['Limited Technical Inspections'],
    chartsType = ['bar'],
    chartsFile = ['csv'],
    chartsURL = ['LTIs2'],
    chartsList = [];

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
function chartsMaker() {
    let c = 0;
    const fragment = document.createDocumentFragment();
    const div = document.createElement('div');
    let htmlText = `
<div class="charts" id="charts" style="display:none">
    <h2>${chartsH2s[c]}</h2>
    <canvas id="${chartsIDs[c]}" width="400" height="400"></canvas>
</div>
`;
    div.className = 'ChartsContainer';
    div.innerHTML = htmlText;
    fragment.appendChild(div);
    document.body.appendChild(fragment);
    makeChart(c);
    chartsDiv = document.getElementById('charts')
};
function makeChart(c) {
    let ctx = document.getElementById(`${chartsIDs[c]}`).getContext('2d');
    let LTIVMTChart = new Chart(ctx, {
        type: `${chartsType[c]}`,
        data: {
            // labels: dataLabels,
            datasets: [{
                //label: dataHeader,
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
                display: false,
            },
            scales: {
                xAxes: [{
                    stacked: false,
                    beginAtZero: true,
                    ticks: {
                        autoSkip: false
                    }
                }],
                yAxes: [{
                    ticks: {

                        beginAtZero: true
                    }
                }]
            },
            plugins: {
                datasource: {
                    type: `${chartsFile[c]}`,
                    url: `data/${chartsURL[c]}.${chartsFile[c]}`,
                    delimiter: ',',
                    rowMapping: 'dataset',
                    datasetLabels: true,
                    indexLabels: true
                }
            }
        }

    });
    chartsList[c] = LTIVMTChart;
};
function LocationFilter() {
    let lSelect = document.getElementById('Location-select');
    let lIndex = lSelect.selectedIndex;
    let lValue = lSelect[lIndex].value;
    let lOption = lSelect[lIndex].text
    //console.log('Value: ' + lValue);
    //console.log('Index: ' + lIndex);
    //console.log('Selected Option: ' + lOption);
    let ci = chartsList[0];

    let meta;
    let i = 0;
    if (lValue != 'nothing') {
        for (i = 0; i < ci.data.datasets.length; i++) {
            meta = ci.getDatasetMeta(i);
            // See controller.isDatasetVisible comment
            meta.hidden = null;

        };
        for (i = 0; i < ci.data.datasets.length; i++) {
            if (i != Number(lValue)) {
                meta = ci.getDatasetMeta(i);
                // See controller.isDatasetVisible comment
                meta.hidden = meta.hidden === null ? !ci.data.datasets[i].hidden : null;
                // We hid a dataset ... rerender the chart
            };
        };
        ci.data.datasets[lValue].backgroundColor = [
            window.chartColors.green,
            window.chartColors.orange,
            window.chartColors.orange,
            window.chartColors.orange,
            window.chartColors.orange,
            window.chartColors.orange
        ];
        ci.data.datasets[lValue].borderColor = [
            window.chartBorderColors.green,
            window.chartBorderColors.red,
            window.chartBorderColors.red,
            window.chartBorderColors.red,
            window.chartBorderColors.red,
            window.chartBorderColors.red
        ];
        ci.update();
        chartsDiv.style.display = '';

    }

};