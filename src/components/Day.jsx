import React, { useEffect, useState } from "react";

export default function Day({day, dayW, data, percentage, handleSubmit}) {

  const [minimized, setMinimized] = useState(true);

  const [minimizedDelayed, setMinimizedDelayed] = useState(true);


  useEffect(() => {
    setTimeout(
      () => {
        setMinimizedDelayed(minimized);
      },
      minimizedDelayed ? 550 : 1000
    );
  }, [minimized]);


  const hideForm = { 
    display: minimizedDelayed ? 'none' : '',
    opacity: '0',
    transition: 'opacity 1s ease',
  }

  const showForm= {
    display: '',
    opacity: minimizedDelayed ? '0' : '1',
    transition: minimizedDelayed ? 'opacity 1s ease 1s' : 'opacity 1s ease',  
  }

  const minimize = {
    height: minimized ? "35px" : "140px",
    transition: minimized ? 'height 1s ease 0.5s' : 'height 1s ease'
  }

  const rotateButton = {
    transform: minimized ? "rotate(90deg)" : "rotate(0deg)"
  }
  


  return (
    <div className="Day" style={minimize}>
      <div className="MainData">
        <p className="DayOfTheWeek">{dayW}</p>
        <p className="DailyPercentage">
          {(
            ((day.Venta + day.Bonificacion / 1.19 + day.Recargas) /
              (data.DailyGoal * percentage)) *
            100
          )
            .toFixed(2)
            .toLocaleString()}
          %
        </p>


        <p className="DailySelled">
          {(day.Venta + day.Bonificacion / 1.19 + day.Recargas)
            .toLocaleString('es', { style: 'currency', currency: 'CLP' })}
        </p>
      </div>

      <button
        onClick={() => {
          setMinimized(!minimized);
        }}
      >
        <img
          style={rotateButton}
          src="https://cdn-icons-png.flaticon.com/512/25/25243.png"
          alt=""
        />
      </button>


      <form
        className="Report"
        style={minimized ? hideForm : showForm}
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
