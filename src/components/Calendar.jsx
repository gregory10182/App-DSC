import React from "react";
import apimonth from "./api/month";
import Day from "./Day";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledCalendar = styled.div`
  display: grid;
  width: 100%;
  row-gap: 5px;
  column-gap: 2px;
  justify-content: center;
  grid-template-columns: repeat(2, 50% [col-start]);

  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 45% [col-start]);
    column-gap: 1rem;
  }
`;

export default function Calendar({ data, percentage, days, setMessage }) {
  const navigate = useNavigate();

  return (
    <StyledCalendar>
      {data?.DailySale &&
        data?.DailySale.map((day, i) => (
          <Day
            key={i + day.Venta + day.Bonificacion + day.Recargas}
            day={day}
            dayW={days[i]}
            data={data}
            Holiday={day.Festivo}
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

              apimonth.ModifyDay(dataToUpdate).then((res) => {
                console.log(res);
                setMessage(res);
                setTimeout(() => {
                  navigate(0);
                }, 3000);
              });
            }}
            handleInvalidDay={() => {
              let dataToUpdate = data;

              dataToUpdate.DailySale[i].Festivo =
                !dataToUpdate.DailySale[i].Festivo;

              console.log(dataToUpdate);

              apimonth.ModifyDay(dataToUpdate).then((res) => {
                setMessage(res);

                setTimeout(() => {
                  navigate(0);
                }, 3000);
              });
            }}
          />
        ))}
    </StyledCalendar>
  );
}
