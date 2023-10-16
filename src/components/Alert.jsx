import React, { useEffect, useState } from "react";

import styled from "styled-components";

const StyledAlert = styled.div`
  position: fixed;
  top: 20px;
  display: flex;
  justify-content: center;
  border: 0.2rem solid #e9a42b;
  align-items: center;
  opacity: 0;
  width: auto;
  padding: 0px 20px;
  height: 30px;
  border-radius: 10px;
  background-color: #009635;
  color: #ebebeb;
  transition: all 0.5s ease;
`;

export default function Alert({ Alert, Message }) {
  const appear = {
    opacity: 1,
  };

  const disappear = {
    opacity: 0,
  };

  return (
    <StyledAlert
      style={(Alert === true) & (Message != "") ? appear : disappear}
    >
      <p>{Message}</p>
    </StyledAlert>
  );
}
