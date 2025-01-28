import React, { useEffect, useState } from "react";
import ClickerButton from "./components/ClickerButton";
import ScoreDisplay from "./components/ScoreDisplay";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const username = "player1";
  const [score, setScore] = useState(0);
  const [prizes, setPrizes] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`http://localhost:5000/api/game/${username}`);
      setScore(data.counter);
      setPrizes(data.prizes);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Clicker Game</h1>
      <ScoreDisplay score={score} prizes={prizes} />
      <ClickerButton username={username} setScore={setScore} />
      <ToastContainer />
    </div>
  );
};

export default App;
