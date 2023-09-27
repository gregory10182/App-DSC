import { useContext } from "react";
import {
  dataContext,
  monthsContext,
  newMonthContext,
  percentageContext,
} from "../context/dataContext";
import apimonth from "./api/month";

export default function Header() {
  const { data, setData } = useContext(dataContext);
  const { percentage, setPercentage } = useContext(percentageContext);
  const { Months } = useContext(monthsContext);
  const { month, setMonth } = useContext(newMonthContext);

  return (
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
  );
}
