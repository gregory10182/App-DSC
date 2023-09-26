import React from "react";
import DataCard from "./DataCard";

export default function Cards({ data, dataPercentage, percentage }) {
  return (
    <div className="Cards">
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
    </div>
  );
}
