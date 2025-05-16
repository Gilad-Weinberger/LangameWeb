import React from "react";
import Score from "./Score";

const PlayerScores = ({ scores }) => {
  // Split scores into chunks of 10
  const chunkSize = 10;
  const chunks = [];
  for (let i = 0; i < scores.length; i += chunkSize) {
    chunks.push(scores.slice(i, i + chunkSize));
  }
  if (chunks.length === 0) {
    // No scores, add one empty column
    chunks.push([]);
  }
  // Pad only the last chunk to length 10
  const lastChunk = chunks[chunks.length - 1];
  while (lastChunk.length < chunkSize) {
    lastChunk.push(null);
  }

  // Each chunk is a column
  const columns = chunks;
  console.log(columns);

  return (
    <div className="flex flex-row items-end gap-2 mt-1">
      {columns.map((column, colIdx) => (
        <div
          key={`col-${colIdx}`}
          className="flex flex-col-reverse items-center gap-1.5"
        >
          {column.map((score, rowIdx) =>
            score !== null ? (
              <Score
                key={`score-${colIdx * chunkSize + rowIdx}`}
                score={score}
              />
            ) : (
              <Score
                key={`empty-${colIdx * chunkSize + rowIdx}`}
                empty={true}
              />
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default PlayerScores;
