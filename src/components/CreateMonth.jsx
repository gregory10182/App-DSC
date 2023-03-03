import React from "react";
import postMonth from "./api/postMonth";


export default function CreateMonth(){
    

    let date = new Date()
    let year = date.getFullYear()

    

  const MonthsArray = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

    return(
        <div className="CreateMonth">
            <form onSubmit={(e) => {

                let data = {
                    "Month" : e.target.Month.value,
                    "Year" : year,
                    "Goal" : e.target.Goal.value
                }

                postMonth(data)
            }}>
                <label>Month: </label>
                <input id="Month" type="number"/>
                <label>Year: &nbsp; {year}</label>
                <label htmlFor="Goal">Meta: </label>
                <input id="Goal" type="number"/>
                <input id="submit" type="submit" />
            </form>
        </div>
    )
}