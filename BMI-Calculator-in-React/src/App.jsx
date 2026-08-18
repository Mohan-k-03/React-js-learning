import React, { useState } from "react";
import "./App.css";

function App() {
  const [weight, setWeight] = useState("");
  const [Height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    if (!Height || !weight || Height < 0 || weight < 0) {
      alert("enter the valid input");
      return;
    }

    const heightInMeters = Height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(bmiValue);

    if (bmiValue < 18.5) setCategory("UnderWeight");
    else if (bmiValue > 18.5 && bmiValue < 24.9) setCategory("Normal Weight");
    else if (bmiValue >= 25 && bmiValue < 29.9) setCategory("over Weigt");
    else setCategory("obese");
  };
  return (
    <div className="app">
      <h1>BMI Calculator</h1>
      <div className="input-section">
        <input
          type="number"
          value={weight}
          placeholder="Weight(kg)"
          onChange={(e) => setWeight(e.target.value)}
        />
        <input
          type="number"
          value={Height}
          placeholder="Height(in meters)"
          onChange={(e) => setHeight(e.target.value)}
        />
        <button onClick={calculateBMI}>Calculator</button>
      </div>

      {bmi && (
        <div className="result">
          <h2>Your BMI: {bmi}</h2>
          <p>Category:{category}</p>
        </div>
      )}
    </div>
  );
}
export default App;
