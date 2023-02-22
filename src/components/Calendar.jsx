import React from "react";
import apiPutDailySale from "./api/putDailySale";

export default function Calendar({data, percentage}) {

  return (
    <div className="Calendar">
      {data?.DailySale &&
        data?.DailySale.map((day, i) => (
          <div key={i}>
            <p>{i + 1}</p>
            <p>
              {(
                ((day.Venta + day.Bonificacion / 1.19) /
                  (data.DailyGoal * percentage)) *
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
                console.log(dataToUpdate);
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
