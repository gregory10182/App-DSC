import BarChart from "../components/BarChart";
import { useContext, useEffect } from "react";
import {
  dailyGoalCContext,
  monthChartContext,
} from "../context/dataContext.js";
import { Page, SectionTitle } from "./styled.js";
import { Bar } from "react-chartjs-2";

export default function ChartsPage() {
  const { dailyGoalC } = useContext(dailyGoalCContext);
  const { monthsChart } = useContext(monthChartContext);

  return (
    <Page>
      <SectionTitle>Graficas</SectionTitle>
      <BarChart data={dailyGoalC} title={"Venta Diaria"} />
      <BarChart data={monthsChart} title={"Resumen Año"} />
    </Page>
  );
}
