import React from "react";
import Score from "./Score";

const PlayerScores = ({ scores }) => {
  // Split scores into chunks of 10
  const chunkSize = 10;
  const chunks = [];
  for (let i = 0; i < scores.length; i += chunkSize) {
    chunks.push(scores.slice(i, i + chunkSize));
  }

  // If the last chunk has less than 10, fill with empty
  if (chunks.length === 0) {
    chunks.push([]);
  }
  const lastChunk = chunks[chunks.length - 1];
  while (lastChunk.length < chunkSize) {
    lastChunk.push(null);
  }

  return (
    <div className="flex flex-col items-center gap-1.5 mt-1">
      {chunks.map((chunk, chunkIdx) => (
        <React.Fragment key={`chunk-${chunkIdx}`}>
          {chunk.map((score, idx) =>
            score !== null ? (
              <Score
                key={`score-${chunkIdx * chunkSize + idx}`}
                score={score}
              />
            ) : (
              <Score key={`empty-${chunkIdx * chunkSize + idx}`} empty={true} />
            )
          )}
          {/* Render vertical line after each chunk except the last */}
          {chunkIdx < chunks.length - 1 && (
            <div className="w-1 h-6 bg-gray-400 rounded-full my-2" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default PlayerScores;
