import React, { useState } from "react";

export default function Day({day, dayW, month, percentage}) {

  const [minimized, setMinimized] = useState(true);

  const [minimizedDelayed, setMinimizedDelayed] = useState(true);


  const hideWhenMinimized = { 
    opacity: minimized ? '0' : '1',
    transition: minimized ? 'opacity 0.5s ease' : 'opacity 0.5s ease 0.5s',
    display: minimizedDelayed ? 'none' : ''
  }
  const minimize = {
    height: minimized ? "20px" : "130px",
    transition: minimized ? 'height 1s ease 0.5s' : 'height 1s ease'
  }

  const rotateButton = {
    transform: minimized ? "rotate(90deg)" : "rotate(0deg)"
  }
  


  return (
    <div style={minimize}>
      <p className="DayOfTheWeek">{dayW}</p>
      <p>
        {(
          ((day.Venta + (day.Bonificacion / 1.19) + day.Recargas) /
            (month.DailyGoal * percentage)) *
          100
        )
          .toFixed(2)
          .toLocaleString()}
        %
      </p>
      <button onClick={() => {
        setMinimized(!minimized)
        setTimeout(() => {
          setMinimizedDelayed(!minimizedDelayed)
        }, minimizedDelayed ? 0 : 1000)
        }
        }>
        <img style={rotateButton} src="https://cdn-icons-png.flaticon.com/512/25/25243.png" alt="" />
      </button>
      <form
        className="Report"
        style={hideWhenMinimized}
        onSubmit={(e) => handleSubmit(e)}
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
        <input id="Recargas" type="number" defaultValue={day.Recargas} />
        <input className="Submit" type="submit" value="Actualizar" />
      </form>
    </div>
  );
}
