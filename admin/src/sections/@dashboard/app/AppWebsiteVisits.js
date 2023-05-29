import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
import { useChart } from '../../../components/chart';

// ----------------------------------------------------------------------

AppWebsiteVisits.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};
const chartLabelss=['04/23/2023', '04/01/2023', '04/01/2023', '04/01/2023', '04/01/2023', '04/01/2023', '04/01/2023', '04/01/2023', '05/01/2023', '04/01/2023', '05/01/2023']
const chart=[{name: 'America', type: 'column', fill: 'solid', data: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
,
{name: 'Europe', type: 'area', fill: 'gradient', data: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
,
{name: 'Asia', type: 'line', fill: 'solid', data:  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}]
export default function AppWebsiteVisits({ title, subheader, chartLabels, chartData, ...other }) {

  const chartOptions = useChart({
    plotOptions: { bar: { columnWidth: '16%' } },
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabelss,
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} visits`;
          }
          return y;
        },
      },
    },
  });
 console.log(chartData);
 console.log(chartLabels,'hhh');
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={chart} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
