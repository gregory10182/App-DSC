import React, { useState, useEffect } from "react";
import apiGetData from "./api/getData";
import apiGetMonths from "./api/getMonths";
import DataCard from "./DataCard";
import "../Style.css";

export default function Container() {
  const [data, setData] = useState();
  const [Months, setMonths] = useState();
  const [dataPercentage, setDataPercentage] = useState();
  const [percentage, setPercentage] = useState(1);

  useEffect(() => {
    apiGetMonths().then((res) => {
      setMonths(res);
      setData(res[0]);
    });
  }, []);

  useEffect(() => {
    adjustPercentage()
  }, [data]);

  useEffect(() => {
    
    adjustPercentage();
    
  }, [percentage]);


  function adjustPercentage() {
    
    
    let MonthDays = new Date(data?.Year, data?.Month, 0).getDate();
    let Goal = Math.trunc(data?.Goal * percentage);
    let DailyGoal = Math.trunc(data?.DailyGoal * percentage);
    let GoalAtDay = Math.trunc(data?.Summary.GoalAtDay * percentage);
    let PercentageAtDay =
      ((data?.Summary.SelledAtDay / GoalAtDay) * 100).toFixed(1) + "%";
    let TotalPercentage =
      ((data?.Summary.SelledAtDay / Goal) * 100).toFixed(1) + "%";
    let Diff = data?.Summary?.SelledAtDay - Goal;
    let Correction = Math.trunc(
      Math.abs(Diff) / (MonthDays - data?.Summary?.Day)
    );
    let DataPercentage = {
      Goal: Goal,
      DailyGoal: DailyGoal,
      GoalAtDay: GoalAtDay,
      PercentageAtDay: PercentageAtDay,
      TotalPercentage: TotalPercentage,
      Diff: Diff,
      Correction: Correction,
    };

    setDataPercentage(DataPercentage);
  }


  const MonthsArray = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  return (
    <div className="Container">
      <div className="MonthSelector">
        <div className="MonthDisplay">
          <label htmlFor="">Mes:</label>
          <p>{MonthsArray[data?.Month - 1]}</p>
        </div>

        <div className="Selector">
          <div>
            <label htmlFor="MonthSelector">Seleccione Mes:</label>
            <select
              name="Months"
              id="MonthSelector"
              onChange={(e) => {
                console.log(e.target.value)
                setData(e.target.value);
              }}
            >
              {Months &&
                Months.map((month, i) => (
                  <option key={i} value={month[i]}>
                    {month._id}
                  </option>
                ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="PercentageSelector">Porcentaje:</label>
            <select
              name="Months"
              id="PercentageSelector"
              onChange={(e) => {
                setPercentage(e.target.value);
              }}
            >
              <option value={1}>100%</option>
              <option value={1.03}>103%</option>
              <option value={1.06}>106%</option>
              <option value={1.1}>110%</option>
            </select>
          </div>

        </div>
      </div>

      <h1 className="SectionTitle">Resumen</h1>

      <div className="Cards">
        <DataCard Name="Meta" Data={dataPercentage?.Goal.toLocaleString()} />
        <DataCard Name="Meta Diaria" Data={dataPercentage?.DailyGoal.toLocaleString()} />
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
          Name="Porcentaje Al Dia"
          Data={dataPercentage?.PercentageAtDay}
        />
        <DataCard
          Name="Porcentaje Total"
          Data={dataPercentage?.TotalPercentage}
        />
        <DataCard
          Name="Diferencia"
          Data={dataPercentage?.Diff.toLocaleString()}
        />
        <DataCard
          Name="Correccion de Meta"
          Data={dataPercentage?.Correction.toLocaleString()}
        />
      </div>

      <h1 className="SectionTitle">Datos Diarios</h1>

      <div className="Calendar">
        {data?.DailySale &&
          data?.DailySale.map((day, i) => (
            <div key={i}>
              <p>{i + 1}</p>
              <p>Vendido: {day.Venta.toLocaleString()}</p>
              <p>Bonificación: {day.Bonificacion.toLocaleString()}</p>
              <p>
                Cumplimiento:{" "}
                {((day.Venta / (data.DailyGoal * percentage) ) * 100).toFixed(2).toLocaleString()}%
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
