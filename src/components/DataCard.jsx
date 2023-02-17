import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

export default function DataCard(props) {
  const { Type, Percentage, Name, Data, Img } = props;

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const GaugeData = {
    datasets: [
      {
        label: Name,
        data: [
          parseInt(Data),
          parseInt(Percentage) * 100 - parseInt(Data) <= 0
            ? 0
            : parseInt(Percentage) * 100 - parseInt(Data),
        ],
        cutout: 13,
        borderColor: ["#ffffff", "#ffffff"],
        backgroundColor: [
          parseInt(Data) < 50 ? "#DC0505" : "#009635",
          "#ffffff",
        ],
        circumference: 190,
        rotation: 264,
      },
    ],
  };

  const GaugeText = {
    id: "GaugeText",
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const {
        ctx,
        data,
        chartArea: { top, bottom, left, right, width, height },
      } = chart;

      const xCenter = chart.getDatasetMeta(0).data[0].x;
      const yCenter = chart.getDatasetMeta(0).data[0].y;

      ctx.save();
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 10px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(data.datasets[0].data[0] + " %", xCenter, yCenter);
    },
  };

  if (!Type) {
    return (
      <div className="DataCard">
        {parseInt(Data) < 0 ? (
          <h1 style={{ color: "rgba(170, 5, 5, 1)" }}>{Data}</h1>
        ) : (
          <h1>{Data}</h1>
        )}

        <p style={{ color: "#eddf1c" }}>{Name}</p>

        <img src={Img} alt="" />
      </div>
    );
  } else if (Type === "percentage") {
    return (
      <div className="DataCard">
        <div className="gauge">
          <Doughnut options={options} data={GaugeData} plugins={[GaugeText]} />
        </div>

        <p style={{ color: "#eddf1c" }}>{Name}</p>

        <img src={Img} alt="" />
      </div>
    );
  }
}
