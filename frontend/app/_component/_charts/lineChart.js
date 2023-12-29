import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: ' Line Chart',
    },
  },
};



export function MyLineChart({ rowData }) {
  // console.log(rowData)
  const labels = rowData?.map(item => item?.DateValue);
  const dataValues = rowData?.map(item => item?.Value);
  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


  const data = {
    labels,
    datasets: [
      {
        label: 'KWH values',
        // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        data: dataValues,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),

        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };


  return <Line options={options} data={data} />;
}
