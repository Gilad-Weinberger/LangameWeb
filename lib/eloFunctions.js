const getKFactor = (elo) => {
  let kFactor;
  if (elo < 2100) {
    kFactor = 32;
  } else if (elo < 2400) {
    kFactor = 24;
  } else {
    kFactor = 16;
  }
  console.log(`Calculated K-Factor for ELO ${elo}: ${kFactor}`);
  return kFactor;
};

export const calculatePlayerWinProbability = (playerElo, opponentElo) => {
  console.log(
    `Calculating win probability for player ELO ${playerElo} vs opponent ELO ${opponentElo}`
  );
  const playerWinProbability =
    1 / (1 + 10 ** ((opponentElo - playerElo) / 400));
  console.log(`Player win probability: ${playerWinProbability}`);
  return playerWinProbability;
};

export const calculateEloChange = (playerElo, opponentElo) => {
  console.log(
    `Calculating ELO change for player ELO ${playerElo} vs opponent ELO ${opponentElo}`
  );
  const playerWinProbability = calculatePlayerWinProbability(
    playerElo,
    opponentElo
  );

  const kFactor = getKFactor(playerElo);

  const playerEloChangeWin = kFactor * (1 - playerWinProbability);
  const playerEloChangeDraw = kFactor * (0.5 - playerWinProbability);
  const playerEloChangeLose = kFactor * (0 - playerWinProbability);

  console.log(
    `ELO changes calculated: Win: ${playerEloChangeWin}, Draw: ${playerEloChangeDraw}, Lose: ${playerEloChangeLose}`
  );
  return { playerEloChangeWin, playerEloChangeDraw, playerEloChangeLose };
};

export const checkIfOpponentIsFairForPlayer = async (player, opponent) => {
  console.log(
    `Checking if opponent ${opponent.id || opponent.uid} (ELO: ${
      opponent.elo
    }) is fair for player ${player.id || player.uid} (ELO: ${player.elo})`
  );
  const playerWinProbability = calculatePlayerWinProbability(
    player.elo,
    opponent.elo
  );
  const isFair = playerWinProbability < 0.65 && playerWinProbability > 0.35;
  if (isFair) {
    console.log(
      `Opponent ${opponent.id || opponent.uid} is a fair match for player ${
        player.id || player.uid
      } (Win probability: ${playerWinProbability}).`
    );
  } else {
    console.log(
      `Opponent ${opponent.id || opponent.uid} is NOT a fair match for player ${
        player.id || player.uid
      } (Win probability: ${playerWinProbability}).`
    );
  }
  return isFair;
};
