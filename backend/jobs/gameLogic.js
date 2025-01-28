export const handleClick = () => {
    let points = 1;
    let prizeWon = false;
  
    if (Math.random() < 0.5) {
      points += 9;
    }
    
    if (Math.random() < 0.25) {
      prizeWon = true;
    }
  
    return { points, prizeWon };
  };
  