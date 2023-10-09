import React from "react";
import DataCard from "./DataCard";
import styled from "styled-components";

const StyledCards = styled.div`
  box-sizing: border-box;
  display: grid;
  width: 100%;
  gap: 0.3rem;
  justify-content: center;
  align-content: center;
  grid-template-columns: repeat(3, 1fr [col-start]);

  @media only screen and (min-width: 768px) {
    width: 90%;
    gap: 0.5rem;
  }
`;

export default function Cards({ data, dataPercentage, percentage }) {
  return (
    <StyledCards>
      <DataCard Name="Meta" Data={dataPercentage?.Goal.toLocaleString()} />
      <DataCard
        Name="Meta Diaria"
        Data={dataPercentage?.DailyGoal.toLocaleString()}
      />
      <DataCard Name="Dia" Data={data?.Summary?.Day} />
      <DataCard
        Name="Objetivo Acumulado"
        Data={dataPercentage?.GoalAtDay.toLocaleString()}
      />
      <DataCard
        Name="Venta Acumulada"
        Data={data?.Summary?.SelledAtDay.toLocaleString()}
      />
      <DataCard
        Name="Diferencia Objetivo"
        Data={dataPercentage?.Diff.toLocaleString()}
      />
      <DataCard
        Name="Venta Diaria Ref"
        Data={dataPercentage?.Correction.toLocaleString()}
      />
      <DataCard
        Name="Cump Acumulado"
        Percentage={percentage}
        Type="percentage"
        Data={dataPercentage?.PercentageAtDay}
      />
      <DataCard
        Name="Avance Objetivo"
        Percentage={percentage}
        Type="percentage"
        Data={dataPercentage?.TotalPercentage}
      />
    </StyledCards>
  );
}
