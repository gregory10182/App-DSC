import React from "react";
import styled from "styled-components";

const StyledDataCard = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  color: #ffffff;
  background-color: #009635;
  border-radius: 1rem;
  position: relative;

  @media only screen and (min-width: 1024px) {
    aspect-ratio: 2/1;
  }
`;

const DataCardTitle = styled.p`
  width: 80%;
  height: max-content;
  max-height: 1.2rem;
  line-height: 0.6rem;
  margin: 0;
  font-weight: 600;
  font-size: 0.6rem;
  color: #e9a42b;
  overflow: hidden;
  vertical-align: baseline;
  position: absolute;
  bottom: 0.6rem;

  @media only screen and (min-width: 768px) {
    font-size: 0.9rem;
    line-height: 0.9rem;
    bottom: 1rem;
  }
`;

const DataCardContent = styled.h1`
  width: 100%;
  font-size: 0.7rem;
  margin: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  @media only screen and (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

export default function DataCard(props) {
  const { Type, Name, Data } = props;

  if (!Type) {
    return (
      <StyledDataCard>
        {parseInt(Data) < 0 ? (
          <DataCardContent style={{ color: "rgba(170, 5, 5, 1)" }}>
            {Data}
          </DataCardContent>
        ) : (
          <DataCardContent>{Data}</DataCardContent>
        )}

        <DataCardTitle>{Name}</DataCardTitle>
      </StyledDataCard>
    );
  } else if (Type === "percentage") {
    return (
      <StyledDataCard>
        {parseInt(Data) < 50 ? (
          <DataCardContent style={{ color: "rgba(170, 5, 5, 1)" }}>
            {Data}
          </DataCardContent>
        ) : (
          <DataCardContent style={{ color: "white" }}>{Data}</DataCardContent>
        )}
        <DataCardTitle>{Name}</DataCardTitle>
      </StyledDataCard>
    );
  }
}
