import Calendar from "../components/Calendar.jsx";
import { useContext } from "react";
import {
  dailyGoalCContext,
  dataContext,
  messageContext,
  percentageContext,
} from "../context/dataContext.js";

export default function CalendarPage() {
  const { data } = useContext(dataContext);
  const { percentage } = useContext(percentageContext);
  const { setMessage } = useContext(messageContext);
  const { dailyGoalC } = useContext(dailyGoalCContext);

  return (
    <div className="CalendarPage">
      <h1 className="SectionTitle">Venta Diaria</h1>

      <Calendar
        data={data}
        percentage={percentage}
        days={dailyGoalC?.labels}
        setMessage={(Message) => setMessage(Message)}
      />
    </div>
  );
}
