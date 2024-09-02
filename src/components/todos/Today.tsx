import { useEffect, useState } from "react";
import { getFormattedDate } from "../../utils/date";

const Today = () => {
  const date = getFormattedDate(new Date());
  const [newDate, setNewDate] = useState(date);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNewDate(getFormattedDate(new Date()));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [newDate]);

  return (
    <div className="today">
      <h2>오늘은 📝</h2>
      <p>{newDate}</p>
    </div>
  );
};

export default Today;
