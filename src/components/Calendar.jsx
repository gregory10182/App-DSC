import React, { useState, useEffect } from "react";
import apimonth from "./api/month"
import Day from "./Day";

export default function Calendar({data, percentage, days, setMessage}) {
  

  return (
    <div className="Calendar">
      {data?.DailySale &&
        data?.DailySale.map((day, i) => (
          <Day
            key={i + day.Venta + day.Bonificacion + day.Recargas}
            day={day}
            dayW={days[i]}
            data={data}
            percentage={percentage}
            handleSubmit={(e) => {
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

              apimonth.dailySale(dataToUpdate).then((res) => {
                console.log(res);
                setMessage(res);
                setTimeout(() => {
                  window.location.reload();
                }, 6000);
              });
            }}
          />
        ))}
    </div>
  );
}
