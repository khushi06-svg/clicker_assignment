import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClickerButton from "./ClickerButton";
import ScoreDisplay from "./ScoreDisplay";
import Leaderboard from "./Leaderboard";
import "../App.css";

const GamePage = () => {
  const [username, setUsername] = useState("");
  const [score, setScore] = useState(0);
  const [prizes, setPrizes] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  // Fetch the API URL from environment variable
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000"; // Default to localhost if not set

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/game/leaderboard`);
        setLeaderboard(data);
      } catch (error) {
        console.log("Error fetching leaderboard", error);
      }
    };
    if (gameStarted) {
      fetchLeaderboard();
    }
  }, [score, gameStarted, apiUrl]); // Add apiUrl to the dependency array

  const handleUsernameSubmit = async () => {
    if (username.trim()) {
      try {
        const { data } = await axios.get(`${apiUrl}/api/game/users/${username}`);
        setScore(data.counter);
        setPrizes(data.prizes);
        setGameStarted(true);
        toast.success("Welcome, " + username);
      } catch (error) {
        toast.error("Error creating user.");
      }
    } else {
      toast.warning("Please enter a valid username!");
    }
  };

  return (
    <div className="app">
      <ToastContainer />
      {!gameStarted ? (
        <div className="username-form">
          <h1>Enter Your Username</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <button onClick={handleUsernameSubmit}>Start Game</button>
        </div>
      ) : (
        <div className="game-container">
          <h1>Hello, {username}</h1>
          <ClickerButton username={username} setScore={setScore} setPrizes={setPrizes} />
          <ScoreDisplay score={score} prizes={prizes} />
          <Leaderboard leaderboard={leaderboard} />
        </div>
      )}
    </div>
  );
};

export default GamePage;
