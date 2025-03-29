import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [activeTab, setActiveTab] = useState("Visual");
  const [altitude, setAltitude] = useState(1500);
  const [hisAngle, setHisAngle] = useState(250);
  const [adiValue, setAdiValue] = useState(50);

  // Fetch data from the backend when the app loads
  useEffect(() => {
    axios.get("http://localhost:5000/api/planes")
      .then((response) => {
        if (response.data.length > 0) {
          const { altitude, his, adi } = response.data[0]; // Take the first entry
          setAltitude(altitude);
          setHisAngle(his);
          setAdiValue(adi);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle form submission and send data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAltitude = parseFloat(e.target.altitude.value);
    const newHisAngle = parseFloat(e.target.his.value);
    const newAdiValue = parseFloat(e.target.adi.value);

    if (newAltitude < 0 || newAltitude > 3000) return alert("Invalid Altitude");
    if (newHisAngle < 0 || newHisAngle > 360) return alert("Invalid HIS Value");
    if (newAdiValue < -100 || newAdiValue > 100) return alert("Invalid ADI Value");

    setAltitude(newAltitude);
    setHisAngle(newHisAngle);
    setAdiValue(newAdiValue);

    try {
      await axios.post("http://localhost:5000/api/planes", {
        altitude: newAltitude,
        his: newHisAngle,
        adi: newAdiValue
      });
      alert("Data submitted successfully");
    } catch (error) {
      console.error("Error submitting data:", error);
    }

    setActiveTab("Visual");
  };

  return (
    <div className="container">
      {/* Tab Buttons */}
      <div className="tab-buttons">
        <button onClick={() => setActiveTab("Text")}>Text</button>
        <button onClick={() => setActiveTab("Visual")}>Visual</button>
        <button onClick={() => setActiveTab("+")}>+</button>
      </div>

      {/* Text Tab */}
      {activeTab === "Text" && (
        <div className="text-tab">
          <h3>Altitude: {altitude}</h3>
          <h3>HIS: {hisAngle}°</h3>
          <h3>ADI: {adiValue}</h3>
        </div>
      )}

      {/* Visual Tab */}
      {activeTab === "Visual" && (
        <div className="visual-tab">
          {/* Altitude Indicator */}
          <div className="altitude">
            <svg width="120" height="450">
              <rect x="40" y="10" width="40" height="400" stroke="black" fill="white" strokeWidth="2" />
              <line x1="40" x2="80" y1={410 - (altitude / 3000) * 400} y2={410 - (altitude / 3000) * 400} stroke="blue" strokeWidth="5" />
              {[0, 500, 1000, 1500, 2000, 2500, 3000].map((val) => (
                <text key={val} x="90" y={415 - (val / 3000) * 400} fontSize="14" fontWeight="bold">{val}</text>
              ))}
            </svg>
            <h3>Altitude</h3>
          </div>

          {/* HIS Compass */}
          <div className="his">
            <svg width="260" height="260">
              <circle cx="125" cy="125" r="100" stroke="black" strokeWidth="3" fill="white" />
              <polygon points="120,20 130,20 125,40" fill="red" />
              <line x1="125" y1="125"
                x2={125 + 50 * Math.cos((hisAngle - 90) * (Math.PI / 180))}
                y2={125 + 50 * Math.sin((hisAngle - 90) * (Math.PI / 180))}
                stroke="orange" strokeWidth="6" />
              {[{ val: 0, x: 120, y: 15 }, { val: 90, x: 230, y: 130 }, { val: 180, x: 113, y: 248 }, { val: 270, x: 0, y: 130 }]
                .map(({ val, x, y }) => (
                  <text key={val} x={x} y={y} fontSize="14" fontWeight="bold">{val}</text>
              ))}
            </svg>
            <h3>HIS</h3>
          </div>

          {/* ADI Indicator */}
          <div className="adi">
            <svg width="150" height="150">
              <defs>
                <linearGradient id="adiGradient" x1="0" x2="0" y1="1" y2="0">
                  <stop offset={`${Math.max(0, 1 - adiValue / 100) * 100}%`} stopColor="green" />
                  <stop offset={`${Math.max(0, 1 - adiValue / 100) * 100}%`} stopColor="blue" />
                </linearGradient>
              </defs>
              <circle cx="75" cy="75" r="60" stroke="black" strokeWidth="3" fill="url(#adiGradient)" />
            </svg>
            <h3>ADI</h3>
          </div>
        </div>
      )}

      {/* Input Form */}
      {activeTab === "+" && (
        <form onSubmit={handleSubmit} className="input-form">
          <label>
            Altitude:
            <input type="number" name="altitude" defaultValue={altitude} />
          </label>
          <br />
          <label>
            HIS:
            <input type="number" name="his" defaultValue={hisAngle} />
          </label>
          <br />
          <label>
            ADI:
            <input type="number" name="adi" defaultValue={adiValue} />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default App;
