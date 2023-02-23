import React, { useState, useEffect } from "react";
import apiGetMonths from "./api/getMonths";
import Cards from "./Cards";
import Calendar from "./Calendar";
import Chart from "./Chart";


import "../Style.css";



export default function Container() {
  const [data, setData] = useState();
  const [Months, setMonths] = useState();
  const [dataPercentage, setDataPercentage] = useState();
  const [percentage, setPercentage] = useState(1);
  const [dailyGoalC, setDailyGoalC] = useState();
  const [chartState, setChartState] = useState(false);

  useEffect(() => {
    apiGetMonths().then((res) => {
      setMonths(res);
      setData(res[0]);
    });
  }, []);

  useEffect(() => {
    adjustPercentage();
  }, [data]);

  useEffect(() => {
    adjustPercentage();
  }, [percentage]);

  function adjustPercentage() {
    let MonthDays = new Date(data?.Year, data?.Month, 0).getDate();

    let hoy = new Date();
    let dia = new Date(data?.Year, data?.Month, 15).getDay();
    const DayArray = [
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
      "Domingo",
    ];

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
    console.log(hoy.get);
    let DataPercentage = {
      Goal: Goal,
      DayArray: DayArray,
      DailyGoal: DailyGoal,
      GoalAtDay: GoalAtDay,
      PercentageAtDay: PercentageAtDay,
      TotalPercentage: TotalPercentage,
      Diff: Diff,
      Correction: Correction,
    };

    let labels = [];
    for (
      let i = 1;
      i <=
      new Date(
        MonthsArrayEN[data?.Month - 1] + " " + i + "," + data?.Year
      ).getDate();
      i++
    ) {
      let date = new Date(
        MonthsArrayEN[data?.Month - 1] + " " + i + "," + data?.Year
      );
      let nameDay = date.getDay();
      labels.push(
        dataPercentage.DayArray[nameDay === 0 ? 6 : nameDay - 1] +
          " " +
          date.getDate()
      );
    }

    const chartData = {
      labels,
      datasets: [
        {
          label: "Meta diaria",
          data: labels.map(() => DailyGoal),
          type: "line",
          borderColor: "#eddf1c",
          backgroundColor: "#eddf1c",
        },
        {
          label: "Venta Total",
          data: data?.DailySale.map((day, i) =>
            Math.trunc(day.Venta + day.Bonificacion / 1.19)
          ),
          borderColor: "#009635",
          backgroundColor: "#009635",
        },
      ],
    };

    setDailyGoalC(chartData);

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

  const MonthsArrayEN = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
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
                console.log(e.target.value);
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

      <Cards data={data} dataPercentage={dataPercentage} percentage={percentage} />

      <h1 className="SectionTitle">Datos Diarios</h1>

      <Calendar data={data} percentage={percentage}/>

      {chartState && (<Chart data={dailyGoalC} />)}
      <button className="ChartButton" onClick={() => {
        setChartState(!chartState)
      }}> Grafico </button>
    </div>
  );
}
