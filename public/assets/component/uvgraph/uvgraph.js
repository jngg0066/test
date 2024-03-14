document.addEventListener('DOMContentLoaded', function () {
    Highcharts.chart('container1', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'UV Trend From 2014-2023',
        align: 'center'
    },
    subtitle: {
        text:
            'Source: <a target="_blank" ' +
            'href="https://data.gov.au/data/organization/australia"> Data.gov.au</a>',
        align: 'center'
    },
    xAxis: {
        categories: ['Spring', 'Summer', 'Autum', 'Winter']
    },
    yAxis: {
        title: {
            text: 'UV index'
        }
    },
    series: [
        {
            name: '2013',
            data: [1.237667308, 2.219688369, 0.906954343, 0.385994822]
        },
        {
            name: '2014',
            data: [1.298017004, 2.170359834, 0.790596879, 0.334892132]
        },
        {
            name: '2015',
            data: [1.333995644, 2.162498702, 0.860063428, 0.335790627]
                
        },
        {
            name: '2016',
            data: [1.183392433, 2.138364144, 0.806312749, 0.374119915]
        },
        {
            name: '2017',
            data: [1.30227263, 1.733819968, 0.931211706, 0.704153882]
        },
        {
            name: '2018',
            data: [1.200073059, 1.68692736, 0.902997886, 0.667525326]
        },
        {
            name: '2019',
            data: [1.298602653, 1.782279184, 0.871764506, 0.679164389]
        },
        {
            name: '2020',
            data: [1.321920465, 1.735646334, 0.899192331, 0.628909954]
        },
        {
            name: '2021',
            data: [ 1.279910312, 1.806790586, 0.834180086, 0.663514842]
        },
        {
            name: '2022',
            data: [1.147707952, 1.756479226, 0.867083154, 0.664917723]
        }
    ]
});
});