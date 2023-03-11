import React, { useState, useEffect } from "react";
import apiPutDailySale from "./api/putDailySale";

export default function Calendar({data, percentage, days}) {

  
  const [month, setMonth] = useState(data);
  
  useEffect(() => {
    setMonth(data)
  }, [data]);

  return (
    <div className="Calendar">
      {month?.DailySale &&
        month?.DailySale.map((day, i) => (
          <div key={i + day.Venta + day.Bonificacion}>
            <p>{days[i]}</p>
            <p>
              {(
                ((day.Venta + day.Bonificacion / 1.19) /
                  (month.DailyGoal * percentage)) *
                100
              )
                .toFixed(2)
                .toLocaleString()}
              %
            </p>
            <form
              className="Report"
              onSubmit={(e) => {
                e.preventDefault();

                

                let dataToUpdate = data;

                dataToUpdate.DailySale[i].Venta = parseInt(
                  e.target.SelledAtDay.value
                );
                dataToUpdate.DailySale[i].Bonificacion = parseInt(
                  e.target.Bonification.value
                );

                apiPutDailySale(dataToUpdate);
              }}
            >
              <label htmlFor="SelledAtDay">Vta afecta: </label>
              <input id="SelledAtDay" type="number" defaultValue={day.Venta} />
              <label htmlFor="Bonification">Bonificación: </label>
              <input
                id="Bonification"
                type="number"
                defaultValue={day.Bonificacion}
              />
              <input className="Submit" type="submit" value="Actualizar" />
            </form>
          </div>
        ))}
    </div>
  );
}
