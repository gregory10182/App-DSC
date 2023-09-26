import BarChart from "../components/BarChart";
import { useContext } from "react";
import { dailyGoalCContext } from "../context/dataContext.js";

export default function ChartsPage() {
  const { dailyGoalC } = useContext(dailyGoalCContext);

  return (
    <div className="ChartsPage">
      <h1 className="SectionTitle">Grafica</h1>
      <BarChart data={dailyGoalC} />
    </div>
  );
}
