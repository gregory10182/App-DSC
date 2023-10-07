import BarChart from "../components/BarChart";
import { useContext } from "react";
import { dailyGoalCContext } from "../context/dataContext.js";
import { Page, SectionTitle } from "./styled.js";

export default function ChartsPage() {
  const { dailyGoalC } = useContext(dailyGoalCContext);

  return (
    <Page>
      <SectionTitle>Grafica</SectionTitle>
      <BarChart data={dailyGoalC} />
    </Page>
  );
}
