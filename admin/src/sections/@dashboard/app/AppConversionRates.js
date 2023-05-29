import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Box, Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
// components
import { useChart } from '../../../components/chart';

// ----------------------------------------------------------------------

AppConversionRates.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
};
const chartlabe=[{label:"Tunisia"},{label:"italy"},{label:"mouritania"},{label:"alger"},{label:"libya"},{label:"Emarates"},{label:"Canada"}]
const chart=[{value:46}, {value:1}, {value:1},{ value:2}, {value:1}, {value:1}, {value:1}]
export default function AppConversionRates({ title, subheader, chartData, ...other }) {
  const chartLabels = chartlabe.map((i) => i.label);

  const chartSeries = chart.map((i) => i.value);

  const chartOptions = useChart({
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: () => '',
        },
      },
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 },
    },
    xaxis: {
      categories: chartLabels,
    },
  });
 
console.log(chartSeries);
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={[{ data: chartSeries }]} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
