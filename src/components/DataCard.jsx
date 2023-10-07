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
import styled from "styled-components";

const StyledDataCard = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  color: #ffffff;
  background-color: #009635;
  border-radius: 1rem;
  position: relative;
`;

const DataCardTitle = styled.p`
  width: 100%;
  margin: 0;
  height: 1rem;
  font-weight: 600;
  font-size: clamp(0.5rem, 2%, 2rem);
  color: #e9a42b;
  overflow: hidden;
  vertical-align: middle;
  position: absolute;
  bottom: 1rem;
`;

const DataCardContent = styled.h1`
  width: 100%;
  font-size: 14px;
  margin: 0;
  position: absolute;
  top: 38%;
`;

const DataCardGauge = styled.div`
  width: 100%;
  height: 40px;
  position: absolute;
  top: 15%;
`;

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
          "#D6D6D6",
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
      ctx.fillStyle = data.datasets[0].data[0] < 50 ? "#DC0505" : "#ffffff";
      ctx.font = "bold 10px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(data.datasets[0].data[0] + " %", xCenter, yCenter);
    },
  };

  if (!Type) {
    return (
      <StyledDataCard>
        {parseInt(Data) < 0 ? (
          <DataCardContent style={{ color: "rgba(170, 5, 5, 1)" }}>
            {Data}
          </DataCardContent>
        ) : (
          <DataCardContent>{Data}</DataCardContent>
        )}

        <DataCardTitle>{Name}</DataCardTitle>
      </StyledDataCard>
    );
  } else if (Type === "percentage") {
    return (
      <StyledDataCard>
        <DataCardGauge>
          <Doughnut options={options} data={GaugeData} plugins={[GaugeText]} />
        </DataCardGauge>

        <DataCardTitle>{Name}</DataCardTitle>
      </StyledDataCard>
    );
  }
}
