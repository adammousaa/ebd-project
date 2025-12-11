

function simulateCreditGeneration(emissions) {
  const baseline = 100;

  
  const reduction = baseline - emissions;

  
  if (reduction <= 0) {
    return 0;
  }

  
  const efficiency = (Math.random() * (1.2 - 0.8) + 0.8).toFixed(2);

  
  let credits = reduction * efficiency;

  
  if (reduction > 30) credits *= 1.1;

  return Number(credits.toFixed(2));
}

module.exports = { simulateCreditGeneration };
