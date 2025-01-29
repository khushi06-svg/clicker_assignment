import React from "react";

const Leaderboard = ({ leaderboard }) => {
  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((user, index) => (
          <li key={user._id}>
            {index + 1}. {user.username} - Score: {user.counter} | Prizes: {user.prizes}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
