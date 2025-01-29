import React from "react";

const ScoreDisplay = ({ score, prizes }) => {
  return (
    <div className="score-display">
      <h2>Score: {score}</h2>
      <h3>Prizes Won: {prizes}</h3>
    </div>
  );
};

export default ScoreDisplay;
