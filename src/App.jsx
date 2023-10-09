import "./App.css";
import "./Style.css";
import GlobalStyle from "./GlobalStyle";
import Header from "./components/Header.jsx";
import Menu from "./components/Menu.jsx";
import Alert from "./components/Alert.jsx";
import Login from "./components/Login.jsx";
import CreateMonth from "./components/CreateMonth";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import {
  dataContext,
  monthsContext,
  dataPercentageContext,
  percentageContext,
  messageContext,
  dailyGoalCContext,
  userContext,
  newMonthContext,
} from "./context/dataContext";
import apimonth from "./components/api/month";
// import Container from "./components/Container";

//pages
import Summary from "./pages/Summary";
import CalendarPage from "./pages/CalendarPage";
import ChartsPage from "./pages/ChartsPage";

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-content: flex-start;
  flex-wrap: wrap;
  min-height: 100vh;
  width: 100%;
  height: 100%;
  margin: 0px 0.5rem;
  padding-bottom: 3rem;

  @media only screen and (min-width: 375px) {
    margin: 0 1rem;
  }

  @media only screen and (min-width: 425px) {
    margin: 0 2rem;
  }

  @media only screen and (min-width: 768px) {
    margin: 0 4rem;
  }

  @media only screen and (min-width: 1024px) {
    margin: 0 8rem;
  }
`;

function App() {
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
    let ActualDays = data?.DailySale.filter((day) => day.Festivo === false);
    let DailyGoal = Math.trunc((Goal / ActualDays?.length) * percentage);
    let GoalAtDay = Math.trunc(DailyGoal * data?.Summary?.Day * percentage);
    let SelledAtDay = data?.Summary?.SelledAtDay;
    let PercentageAtDay = ((SelledAtDay / GoalAtDay) * 100).toFixed(1) + "%";
    let TotalPercentage = ((SelledAtDay / Goal) * 100).toFixed(1) + "%";
    let Diff = SelledAtDay - Goal;
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
    return <Login setUser={setUserLogin} />;
  } else {
    return (
      <Container>
        <GlobalStyle />
        <dataContext.Provider value={{ data, setData }}>
          <monthsContext.Provider value={{ Months, setMonths }}>
            <dataPercentageContext.Provider
              value={{ dataPercentage, setDataPercentage }}
            >
              <percentageContext.Provider value={{ percentage, setPercentage }}>
                <messageContext.Provider value={{ message, setMessage }}>
                  <dailyGoalCContext.Provider
                    value={{ dailyGoalC, setDailyGoalC }}
                  >
                    <userContext.Provider value={{ user, setUser }}>
                      <newMonthContext.Provider value={{ month, setMonth }}>
                        {month && (
                          <CreateMonth
                            setMessage={(Message) => setMessage(Message)}
                          />
                        )}
                        <Header />
                        <Routes>
                          <Route path="/" element={<Summary />} />
                          <Route path="/calendar" element={<CalendarPage />} />
                          <Route path="/charts" element={<ChartsPage />} />
                        </Routes>
                        <Menu />
                        <Alert Alert={alert} Message={message} />
                      </newMonthContext.Provider>
                    </userContext.Provider>
                  </dailyGoalCContext.Provider>
                </messageContext.Provider>
              </percentageContext.Provider>
            </dataPercentageContext.Provider>
          </monthsContext.Provider>
        </dataContext.Provider>
      </Container>
    );
  }
}

export default App;
