import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ClickerButton = ({ username, setScore, setPrizes }) => {
  const [loading, setLoading] = useState(false);

  // Fetch the API URL from environment variable
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000"; // Default to localhost if not set

  const handleClick = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${apiUrl}/api/game/click/${username}`);
      setScore(data.counter);
      setPrizes(data.prizes);

      if (data.prizeWon) {
        toast.success("🎉 You won a prize!");
      }
    } catch (error) {
      toast.error("⚠️ Error clicking the button!");
    }
    setLoading(false);
  };

  return (
    <button className="click-button" onClick={handleClick} disabled={loading}>
      {loading ? "Loading..." : "Click Me!"}
    </button>
  );
};

export default ClickerButton;
