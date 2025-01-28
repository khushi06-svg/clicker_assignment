import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ClickerButton = ({ username, setScore }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`http://localhost:5000/api/game/click/${username}`);
      setScore(data.counter);
      if (data.prizeWon) {
        toast.success("You won a prize!");
      }
    } catch (error) {
      toast.error("Error clicking button!");
    }
    setLoading(false);
  };

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? "Loading..." : "Click Me!"}
    </button>
  );
};

export default ClickerButton;
