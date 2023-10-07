import React from "react";
import apimonth from "./api/month";
import styled from "styled-components";

const StyledCreateMonth = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 14rem;
  height: 30%;
  margin-top: -20%;
  margin-left: -7.5rem;
  padding: 1rem;
  top: 50%;
  left: 50%;
  border-radius: 10px;
  border: 1px solid #e9a42b;
  background-color: #009635;
  z-index: 99;
`;

const CreateMonthForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StyledLabel = styled.label`
  display: flex;
  color: #ffffff;
  width: 100%;
  height: 25px;
  font-size: 13px;
  font-weight: 550;
  margin-bottom: -10px;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 25px;
  outline: none;
  border: none;
  border-radius: 5px;
`;

export default function CreateMonth({ setMessage }) {
  let date = new Date();
  let year = date.getFullYear();

  return (
    <StyledCreateMonth>
      <CreateMonthForm
        onSubmit={(e) => {
          e.preventDefault();

          let data = {
            Month: e.target.Month.value,
            Year: year,
            Goal: e.target.Goal.value,
          };

          apimonth.create(data).then((res) => {
            console.log(res);
            setMessage(res);
            setTimeout(() => {
              window.location.reload();
            }, 6000);
          });
        }}
      >
        <StyledLabel>Month: </StyledLabel>
        <StyledInput id="Month" type="number" />
        <StyledLabel>Year: &nbsp; {year}</StyledLabel>
        <StyledLabel htmlFor="Goal">Meta: </StyledLabel>
        <StyledInput id="Goal" type="number" />
        <StyledInput id="submit" type="submit" />
      </CreateMonthForm>
    </StyledCreateMonth>
  );
}
