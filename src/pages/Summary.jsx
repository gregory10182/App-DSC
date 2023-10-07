import { useContext } from "react";
import Cards from "../components/Cards";
import {
  dataContext,
  dataPercentageContext,
  percentageContext,
} from "../context/dataContext";
import { Page, SectionTitle } from "./styled.js";

export default function Summary() {
  const { data } = useContext(dataContext);
  const { dataPercentage } = useContext(dataPercentageContext);
  const { percentage } = useContext(percentageContext);

  return (
    <Page>
      <SectionTitle>Resumen al dia</SectionTitle>
      <Cards
        data={data}
        dataPercentage={dataPercentage}
        percentage={percentage}
      />
    </Page>
  );
}
