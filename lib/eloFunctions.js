const getKFactor = (elo) => {
  if (elo < 2100) return 32;
  if (elo < 2400) return 24;
  return 16;
};

export const calculatePlayerWinProbability = (playerElo, opponentElo) => {
  const playerWinProbability =
    1 / (1 + 10 ** ((opponentElo - playerElo) / 400));

  return playerWinProbability;
};

export const calculateEloChange = (playerElo, opponentElo) => {
  const playerWinProbability = calculatePlayerWinProbability(
    playerElo,
    opponentElo
  );

  const kFactor = getKFactor(playerElo);

  const playerEloChangeWin = kFactor * (1 - playerWinProbability);
  const playerEloChangeDraw = kFactor * (0.5 - playerWinProbability);
  const playerEloChangeLose = kFactor * (0 - playerWinProbability);

  return { playerEloChangeWin, playerEloChangeDraw, playerEloChangeLose };
};

export const checkIfOpponentIsFairForPlayer = async (player, opponent) => {
  const playerWinProbability = calculatePlayerWinProbability(
    player.elo,
    opponent.elo
  );
  return playerWinProbability < 0.65 && playerWinProbability > 0.35;
};
