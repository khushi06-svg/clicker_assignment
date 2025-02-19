import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import cookieImg from './cookie.png';

const GamePage = () => {
  const [username, setUsername] = useState("");
  const [score, setScore] = useState(0);
  const [prizes, setPrizes] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (gameStarted) {
      const fetchLeaderboard = async () => {
        try {
          const { data } = await axios.get("http://localhost:5000/api/game/leaderboard");
          setLeaderboard(data);
        } catch (error) {
          console.log("Error fetching leaderboard", error);
        }
      };
      fetchLeaderboard();
    }
  }, [score, gameStarted]);

  const showToast = (message, type) => {
    toast.dismiss(); // Prevent stacking
    toast[type](message, {
      position: "bottom-center",
      className: "custom-toast",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  };

  const handleUsernameSubmit = async () => {
    if (username.trim()) {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/game/users/${username}`);
        setScore(data.counter);
        setPrizes(data.prizes);
        setGameStarted(true);
        showToast(`Welcome, ${username}! 🎉`, "success");
      } catch (error) {
        showToast("Error creating user.", "error");
      }
    } else {
      showToast("Please enter a valid username!", "warning");
    }
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`http://localhost:5000/api/game/click/${username}`);
      setScore(data.counter);
      setPrizes(data.prizes);
      if (data.prizeWon) {
        showToast("🎉 You won a prize!", "success");
      }
    } catch (error) {
      showToast("⚠️ Error clicking the button!", "error");
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <ToastContainer />
      {!gameStarted ? (
       <div className="container">
        
       <div className="login-box">
       <h1>COOKIE CLICKER GAME</h1>
         <h4>Enter Your Username</h4>
         <input
           type="text"
           placeholder="Username"
           value={username}
           onChange={(e) => setUsername(e.target.value)}
           className="input-field"
           autoFocus
         />
         <button onClick={handleUsernameSubmit} className="start-button">
           Start Game
         </button>
       </div>
     </div>
      ) : (
        <div className="game-container">
          <h1>Hello, {username}</h1>
          <img
            src={cookieImg}
            className="cookie"
            onClick={handleClick}
            alt="Cookie"
          />
          <div className="score-display">
            <h2>Score: {score}</h2>
            <h3>Prizes Won: {prizes}</h3>
          </div>
          <div className="leaderboard">
            <h2>Leaderboard</h2>
            <p>Top Score: {leaderboard.length > 0 ? leaderboard[0].counter : 0}</p>
            <div className="leaderboard-grid">
              {leaderboard.slice(0, 6).map((user, index) => {
                const rankLabels = ["Gold", "Silver", "Bronze", "4th", "5th", "6th"];
                const topScore = leaderboard[0]?.counter || 1;
                const progressWidth = Math.min((user.counter / topScore) * 100, 100) + "%";

                return (
                  <div key={user._id} className="leaderboard-card">
                    <p className={`rank-label rank-${index + 1}`}>{rankLabels[index]}</p>
                    <p className="username">{user.username}</p>
                    <div className="progress-bar">
                      <div className="progress" style={{ width: progressWidth }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;
