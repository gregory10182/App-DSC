import React from "react";

// Charts
import Chart from 'chart.js/auto';

import { Bar } from "react-chartjs-2";

export default function BarChart({data}) {




  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Venta Diaria",
      },
    },
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
  };


  return (
    <div className="Charts">
      {data && <Bar options={options} data={data} />}

      
    </div>
  );
}
