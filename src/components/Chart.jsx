import React from "react";

// Charts

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  ArcElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

export default function Chart({data}) {


  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );

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
