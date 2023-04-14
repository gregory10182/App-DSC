import React, { useState, useEffect } from "react";
import apimonth from "./api/month"

export default function Calendar({data, percentage, days, setMessage}) {

  
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

                dataToUpdate.DailySale[i].Recargas = parseInt(
                  e.target.Recargas.value
                );

                
                apimonth.dailySale(dataToUpdate)
                .then((res) => {
                  console.log(res)
                  setMessage(res)
                  setTimeout(() => {
                    window.location.reload();
                  }, 6000);
                })
                // apiPutDailySale(dataToUpdate);
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
              <label htmlFor="Recargas">Recargas: </label>
              <input
                id="Recargas"
                type="number"
                defaultValue={day.Recargas}
              />
              <input className="Submit" type="submit" value="Actualizar" />
            </form>
          </div>
        ))}
    </div>
  );
}
