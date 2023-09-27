import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import Calendar from "./Calendar";
import BarChart from "./BarChart";
import Alert from "./Alert";
import CreateMonth from "./CreateMonth";
import Login from "./Login";
import apimonth from "./api/month";

import "../Style.css";

export default function Container() {
  const [data, setData] = useState();
  const [Months, setMonths] = useState();
  const [dataPercentage, setDataPercentage] = useState();
  const [percentage, setPercentage] = useState(1);
  const [dailyGoalC, setDailyGoalC] = useState();
  const [chartState, setChartState] = useState(false);
  const [month, setMonth] = useState(false);
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(false);

  const setUserLogin = (user) => {
    setUser(user);
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");

    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);

      setUser(loggedUser);

      apimonth.setToken(loggedUser.token);
    }
  }, []);

  useEffect(() => {
    adjustPercentage();
    if (data?.id) {
      apimonth
        .updateDay(data.id)
        .then((res) => {
          setMessage(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [data]);

  useEffect(() => {
    if (user != "") {
      apimonth.setToken(user.token);
      apimonth.getAll().then((res) => {
        let ids = res.map((month) => ({
          Mid: month.mid,
          id: month.id,
        }));
        setMonths(ids);
        if (ids.length != 0) {
          apimonth.getOne(ids[ids.length - 1].id).then((res) => {
            setData(res);
          });
        }
      });
    }
  }, [user]);

  useEffect(() => {
    adjustPercentage();
  }, [percentage]);

  useEffect(() => {
    if (message != "") {
      setAlert(!alert);
    }
  }, [message]);

  useEffect(() => {
    if (alert === true) {
      setTimeout(() => {
        setAlert(!alert);
      }, 5000);

      setTimeout(() => {
        setMessage("");
      }, 6000);
    }
  }, [alert]);

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

  if (user === "") {
    return (
      <div className="Container">
        <Login setUser={setUserLogin} />
      </div>
    );
  } else {
    return (
      <div className="Container">
        <div className="logout">
          <button
            onClick={() => {
              apimonth.setToken(null);
              window.localStorage.removeItem("loggedUser");
              setUser("");
              setData();
              setMonths();
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/10067/10067609.png"
              alt=""
            />
          </button>
        </div>

        <div className="MonthSelector">
          <h1 className="SectionTitle">Seguimiento De Venta Diaria</h1>

          <div className="Selector">
            <div className="SelectMP">
              <label htmlFor="MonthSelector">Seleccione Mes:</label>
              <select
                name="Months"
                id="MonthSelector"
                onChange={(e) => {
                  apimonth.getOne(e.target.value).then((res) => {
                    setData(res);
                  });
                  // apiGetMonth(e.target.value)
                  // .then((res) => {
                  //   setData(res)
                  // })
                }}
                value={data && data.id}
              >
                {Months &&
                  Months.map((month, i) => (
                    <option key={i} value={month.id}>
                      {month.Mid}
                    </option>
                  ))}
              </select>
              <button
                onClick={() => {
                  setMonth(!month);
                }}
              >
                <img src="https://cdn-icons-png.flaticon.com/512/4421/4421540.png" />
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

        {!data ? (
          <div className="NoData">
            <h2>No hay meses aun</h2>
          </div>
        ) : (
          <div className="Data">
            <h1 className="SectionTitle">Resumen al dia</h1>

            <Cards
              data={data}
              dataPercentage={dataPercentage}
              percentage={percentage}
            />

            <h1 className="SectionTitle">Venta Diaria</h1>

            <Calendar
              data={data}
              percentage={percentage}
              days={dailyGoalC?.labels}
              setMessage={(Message) => setMessage(Message)}
            />

            {chartState && <BarChart data={dailyGoalC} />}
            <button
              className="ChartButton"
              onClick={() => {
                setChartState(!chartState);
              }}
            >
              Grafico
            </button>
          </div>
        )}
        <Alert Alert={alert} Message={message} />
      </div>
    );
  }
}
