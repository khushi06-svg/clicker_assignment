import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ClickerButton = ({ username, setScore, setPrizes }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`http://localhost:5000/api/game/click/${username}`);
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
