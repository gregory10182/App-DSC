import React from "react";
import styled from "styled-components";

// Charts
import Chart from "chart.js/auto";

import { Bar } from "react-chartjs-2";

const StyledCharts = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100% !important;
  height: 400px !important;
`;

export default function BarChart({ data, title }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
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
    <StyledCharts>{data && <Bar options={options} data={data} />}</StyledCharts>
  );
}
