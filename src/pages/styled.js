import styled from "styled-components";

export const SectionTitle = styled.h1`
  width: 100%;
  font-size: 21px;
  margin-bottom: 1rem;
  color: #009635;

  @media only screen and (min-width: 1024px) {
    margin-top: 0.5rem;
  }
`;

export const Page = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  width: 100%;
  height: 100%;
  padding-bottom: 3rem;
`;
