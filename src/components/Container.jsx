import React, { useState, useEffect } from "react";
import apiGetMonth from "./api/getMonth";
import apiGetMonths from "./api/getMonths";
import updateDay from "./api/updateDay";
import Cards from "./Cards";
import Calendar from "./Calendar";
import BarChart from "./BarChart";
import CreateMonth from "./CreateMonth";
import Login from "./login";


import "../Style.css";



export default function Container() {
  const [data, setData] = useState();
  const [Months, setMonths] = useState();
  const [dataPercentage, setDataPercentage] = useState();
  const [percentage, setPercentage] = useState(1);
  const [dailyGoalC, setDailyGoalC] = useState();
  const [chartState, setChartState] = useState(false);
  const [month, setMonth] = useState(false);

  useEffect(() => {

    let ids
    apiGetMonths()
    .then((res) => {
      ids = res.map((month) => month._id);
      setMonths(ids);

      apiGetMonth(ids[ids.length - 1])
      .then((res) => {
        setData(res)
      });
      
    });

    // let actualMonth = new Date()
    // actualMonth = (actualMonth.getMonth() + 1) + "-" + actualMonth.getFullYear();
    // let month;
    // apiGetMonth(actualMonth)
    // .then((res) => {
    //   month = res
    //   setData(res)
    // });



  }, []);

  useEffect(() => {
    adjustPercentage();
    if(data?._id){
      updateDay(data?._id)
    }
  }, [data]);

  useEffect(() => {
    adjustPercentage();
  }, [percentage]);

  function adjustPercentage() {
    let MonthDays = new Date(data?.Year, data?.Month, 0).getDate();
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
    let GoalAtDay = Math.trunc(data?.Summary?.GoalAtDay * percentage);
    let PercentageAtDay =
      ((data?.Summary?.SelledAtDay / GoalAtDay) * 100).toFixed(1) + "%";
    let TotalPercentage =
      ((data?.Summary?.SelledAtDay / Goal) * 100).toFixed(1) + "%";
    let Diff = data?.Summary?.SelledAtDay - Goal;
    let Correction = Math.trunc(
      Math.abs(Diff) / (MonthDays - data?.Summary?.Day)
    );
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

  // if(localStorage.getItem('tkn') === null){
  //   return(
  //     <div className="Container">
  //       <Login />
  //     </div>
  //   )
  // }

  if(!data) return "Cargando...."

  return (
    <div className="Container">
      {month && (<CreateMonth />)}
      <div className="MonthSelector">
        <h1 className="SectionTitle">
          Seguimiento De Venta Diaria
        </h1>

        <div className="Selector">
          <div className="SelectMP">
            <label htmlFor="MonthSelector">Seleccione Mes:</label>
            <select
              name="Months"
              id="MonthSelector"
              onChange={(e) => {
                apiGetMonth(e.target.value)
                .then((res) => {
                  setData(res)
                })
              }}
              value={data && data._id}
            >
              {Months &&
                Months.map((month, i) => (
                  <option key={i} value={month}>
                    {month} 
                  </option>
                ))}
            </select>
            <button onClick={() => setMonth(!month)}>
              <img src="https://cdn-icons-png.flaticon.com/512/4421/4421540.png"/>
            </button>
          </div>

          <div className="SelectMP">
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

      <h1 className="SectionTitle">Resumen al dia</h1>

      <Cards data={data} dataPercentage={dataPercentage} percentage={percentage} />

      <h1 className="SectionTitle">Venta Diaria</h1>

      <Calendar data={data} percentage={percentage} days={dailyGoalC?.labels} />

      {chartState && (<BarChart data={dailyGoalC} />)}
      <button className="ChartButton" onClick={() => {
        setChartState(!chartState)
      }}> Grafico </button>
    </div>
  );
}
