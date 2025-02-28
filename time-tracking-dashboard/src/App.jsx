// import Header from "./components/Header";
import Report from "./components/Report";
import { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState([])
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("daily")
  const [activeButton, setActiveButton] = useState("daily");

  useEffect(() => {
    fetch("data.json")
      .then(response => response.json())
      .then(data => setData(data));
  }, [])

  const handleButtonClick = (time) => {
    setSelectedTimeFrame(time);
    setActiveButton(time);
  };

  return (
    <>
      <header className="header">
        <div className="profile">
          <img src="./images/image-jeremy.png" alt="Jeremy Robson" />
          <h1><span>Report for</span>Jeremy Robson</h1>
        </div>
        <div className="time-frame">
          <button
            aria-pressed={activeButton === "daily"}
            className={`time-btn ${activeButton === "daily" ? "active" : ""}`}
            onClick={() => handleButtonClick("daily")}
          >Daily
          </button>
          <button
            aria-pressed={activeButton === "weekly"}
            className={`time-btn ${activeButton === "weekly" ? "active" : ""}`}
            onClick={() => handleButtonClick("weekly")}
          >Weekly
          </button>
          <button
            aria-pressed={activeButton === "monthly"}
            className={`time-btn ${activeButton === "monthly" ? "active" : ""}`}
            onClick={() => handleButtonClick("monthly")}
          >Monthly
          </button>
        </div>

      </header>

      <Report
        data={data}
        time={selectedTimeFrame} />
    </>
  )
}



