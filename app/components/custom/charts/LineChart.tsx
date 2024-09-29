import HighchartsReact from 'highcharts-react-official';
import highstock from 'highcharts/highstock';

const options = {
    chart: {
        height: 280,
    },
    title: {
        text: '',
    },
    xAxis: {
        title: {
            text: '',
        },
        type: 'category',
        categories: ['Aug 17', '18', '19', '20', '21', '22', '23', '24'],
    },
    yAxis: [
        {
            title: {
                text: '',
            },
        },
    ],
    series: [
        {
            data: [
                29.9,
                71.5,
                106.4,
                129.2,
                144.0,
                176.0,
                135.6,
                148.5,
            ]
        }

    ]
};

export default function LineChart() {
    return (
        <div>
            <HighchartsReact options={options} highcharts={highstock} />
        </div>
    );
}
