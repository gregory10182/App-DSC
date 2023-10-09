import React, { useEffect, useState } from "react";
import ToolTip from "./ToolTip";
import styled from "styled-components";

const StyledDay = styled.div`
  display: flex;
  height: ${(props) => (props.$minimized === "true" ? `2.5rem` : `8.75rem`)};
  justify-content: center;
  flex-wrap: wrap;
  background-color: #009635;
  padding: 0.8rem 0.625rem;
  padding-top: 0.375rem;
  row-gap: 5px;
  column-gap: 2px;
  border-radius: 5px;
  color: #ffffff;
  transition: ${(props) =>
    props.$minimized === "true" ? `all 1s ease 0.5s` : `all 1s ease`};

  @media only screen and (min-width: 768px) {
    height: ${(props) => (props.$minimized === "true" ? `3rem` : `10rem`)};
    padding: ${(props) =>
      props.$minimized === "true" ? `0.3rem 1rem` : `0.8rem 1rem`};
    padding-top: 0.4rem;
  }
`;

const MainData = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 80%;
  height: max-content;
  padding: 0px;
`;

const HolidayData = styled(MainData)`
  justify-content: flex-start !important;
  align-items: center;
`;

const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  row-gap: 2px;
  align-items: center;
  width: 18%;

  @media only screen and (min-width: 768px) {
    flex-direction: column;
    align-content: flex-end;
  }
`;

const DayOfTheWeek = styled.p`
  width: 100%;
  text-align: left;
  width: 70%;
  height: 20px;
  font-size: 0.625rem;
  margin: 0;

  @media only screen and (min-width: 768px) {
    font-size: 0.75rem;
  }
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 5px;

  @media only screen and (min-width: 768px) {
    width: 1.4rem;
    height: 1.4rem;
  }
`;

const StyledButtonImg = styled.img`
  transform: ${(props) =>
    props.$minimized === "true" ? `rotate(90deg)` : `rotate(0deg)`};
  width: 10px;
  height: 10px;
  transition: transform 0.5s;
`;

const ReportForm = styled.form`
  display: grid;
  width: 100%;
  column-gap: 5px;
  row-gap: 5px;
  justify-content: center;
  align-items: center;
  text-align: left;
  grid-template-columns: repeat(2, 50% [col-start]);
  grid-template-rows: repeat(4, 22% [row-start]);
`;

const StyledInput = styled.input`
  width: 95%;
  height: 18px;
  font-size: 9px;
  border-radius: 5px;
  border: none;
  outline: none;
`;

const SubmitButton = styled.input`
  grid-column: 1 / 3;
  border-radius: 10px;
  width: 100%;
  height: 20px;
  font-size: 11px;
  background-color: #eddf1c;
  outline: none;
  border: none;
`;

const DailyPercentage = styled.p`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  font-size: 0.625rem;
  margin: 0;

  @media only screen and (min-width: 768px) {
    font-size: 0.75rem;
  }
`;

const DailySelled = styled.p`
  width: 100%;
  height: 20px;
  text-align: left;
  margin-top: -2px;
  font-size: 0.625rem;
  margin: 0;

  @media only screen and (min-width: 768px) {
    font-size: 0.75rem;
  }
`;

const StyledLabel = styled.label`
  width: 95%;
  height: 20px;
  font-size: 0.625rem;
  margin: 0;

  @media only screen and (min-width: 768px) {
    font-size: 0.8rem;
  }
`;

export default function Day({
  day,
  dayW,
  data,
  percentage,
  handleSubmit,
  handleInvalidDay,
  Holiday,
}) {
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
    display: minimizedDelayed ? "none" : "",
    opacity: "0",
    transition: "opacity 1s ease",
  };

  const showForm = {
    display: "",
    opacity: minimizedDelayed ? "0" : "1",
    transition: minimizedDelayed ? "opacity 1s ease 1s" : "opacity 1s ease",
  };

  if (Holiday) {
    return (
      <StyledDay $minimized={minimized.toString()}>
        <HolidayData>
          <DayOfTheWeek>{dayW}</DayOfTheWeek>

          <DailySelled>Festivo</DailySelled>
        </HolidayData>

        <StyledButton
          onClick={() => {
            handleInvalidDay();
          }}
        >
          <StyledButtonImg
            src={Holiday ? "./eye.svg" : "./eye-off.svg"}
            alt=""
          />
        </StyledButton>
      </StyledDay>
    );
  } else {
    return (
      <StyledDay $minimized={minimized.toString()}>
        <MainData>
          <DayOfTheWeek>{dayW}</DayOfTheWeek>
          <DailyPercentage>
            {(
              ((day.Venta + day.Bonificacion / 1.19 + day.Recargas) /
                (data.DailyGoal * percentage)) *
              100
            )
              .toFixed(2)
              .toLocaleString()}
            %
          </DailyPercentage>

          <DailySelled>
            {(
              day.Venta +
              day.Bonificacion / 1.19 +
              day.Recargas
            ).toLocaleString("es", { style: "currency", currency: "CLP" })}
          </DailySelled>
        </MainData>

        <Buttons>
          <StyledButton
            onClick={() => {
              setMinimized(!minimized);
            }}
          >
            <StyledButtonImg
              $minimized={minimized.toString()}
              src="https://cdn-icons-png.flaticon.com/512/25/25243.png"
              alt=""
            />
          </StyledButton>
          <StyledButton
            onClick={() => {
              handleInvalidDay();
            }}
          >
            <StyledButtonImg
              src={Holiday ? "./eye.svg" : "./eye-off.svg"}
              alt=""
            />
          </StyledButton>
        </Buttons>

        <ReportForm
          style={minimized ? hideForm : showForm}
          onSubmit={(e) => handleSubmit(e)}
        >
          <StyledLabel htmlFor="SelledAtDay">Vta afecta: </StyledLabel>
          <StyledInput
            id="SelledAtDay"
            type="number"
            defaultValue={day.Venta}
          />
          <StyledLabel htmlFor="Bonification">Bonificación: </StyledLabel>
          <StyledInput
            id="Bonification"
            type="number"
            defaultValue={day.Bonificacion}
          />
          <StyledLabel htmlFor="Recargas">Recargas: </StyledLabel>
          <StyledInput
            id="Recargas"
            type="number"
            defaultValue={day.Recargas}
          />
          <SubmitButton className="Submit" type="submit" value="Actualizar" />
        </ReportForm>
      </StyledDay>
    );
  }
}
