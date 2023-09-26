import { useContext } from "react";
import Cards from "../components/Cards";
import {
  dataContext,
  dataPercentageContext,
  percentageContext,
} from "../context/dataContext";

export default function Summary() {
  const { data } = useContext(dataContext);
  const { dataPercentage } = useContext(dataPercentageContext);
  const { percentage } = useContext(percentageContext);

  return (
    <div className="SummaryPage">
      <h1 className="SectionTitle">Resumen al dia</h1>
      <Cards
        data={data}
        dataPercentage={dataPercentage}
        percentage={percentage}
      />
    </div>
  );
}
