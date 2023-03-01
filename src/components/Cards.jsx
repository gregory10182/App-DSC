import React from "react";
import DataCard from "./DataCard";




export default function Cards({data, dataPercentage, percentage}){

    return(
        <div className="Cards">
        <DataCard Name="Meta" Data={dataPercentage?.Goal.toLocaleString()} />
        <DataCard
          Name="Meta Diaria"
          Data={dataPercentage?.DailyGoal.toLocaleString()}
        />
        <DataCard Name="Dia" Data={data?.Summary.Day} />
        <DataCard
          Name="Meta Teorica"
          Data={dataPercentage?.GoalAtDay.toLocaleString()}
        />
        <DataCard
          Name="Vendido Al Dia"
          Data={data?.Summary.SelledAtDay.toLocaleString()}
        />
        <DataCard
          Name="Diferencia"
          Data={dataPercentage?.Diff.toLocaleString()}
        />
        <DataCard
          Name="Correccion de Meta"
          Data={dataPercentage?.Correction.toLocaleString()}
        />
        <DataCard
          Name="Porcentaje Al Dia"
          Percentage={percentage}
          Type="percentage"
          Data={dataPercentage?.PercentageAtDay}
        />
        <DataCard
          Name="Porcentaje Total"
          Percentage={percentage}
          Type="percentage"
          Data={dataPercentage?.TotalPercentage}
        />
      </div>
    )
}