import { useContext } from "react";
import {
  dataContext,
  monthsContext,
  newMonthContext,
  percentageContext,
} from "../context/dataContext";
import apimonth from "./api/month";
import { SectionTitle } from "../pages/styled";
import styled from "styled-components";

const MonthSelector = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  row-gap: 0.625rem;
  margin-top: 1rem;
  margin-bottom: 2.1rem;
  width: 100%;
  height: 5%;
`;

const Selector = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  padding: 10px 0px;
  border-radius: 5px;
  background-color: #009635;
  color: #ffffff;
`;

const SelectMP = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
`;

const SelectMPTitle = styled.label`
  width: 100%;
`;

const StyledSelect = styled.select`
  width: 70px;
  height: 30px;
  border-radius: 5px;
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  padding: 0;

  & img {
    width: 20px;
    height: 20px;
  }
`;

export default function Header() {
  const { data, setData } = useContext(dataContext);
  const { percentage, setPercentage } = useContext(percentageContext);
  const { Months } = useContext(monthsContext);
  const { month, setMonth } = useContext(newMonthContext);

  return (
    <MonthSelector>
      <SectionTitle>Seguimiento De Venta Diaria</SectionTitle>

      <Selector>
        <SelectMP>
          <SelectMPTitle htmlFor="MonthSelector">Seleccione Mes:</SelectMPTitle>
          <StyledSelect
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
          </StyledSelect>
          <StyledButton
            onClick={() => {
              setMonth(!month);
            }}
          >
            <img src="https://cdn-icons-png.flaticon.com/512/4421/4421540.png" />
          </StyledButton>
        </SelectMP>

        <SelectMP>
          <SelectMPTitle htmlFor="PercentageSelector">
            Porcentaje:
          </SelectMPTitle>
          <StyledSelect
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
          </StyledSelect>
        </SelectMP>
      </Selector>
    </MonthSelector>
  );
}
