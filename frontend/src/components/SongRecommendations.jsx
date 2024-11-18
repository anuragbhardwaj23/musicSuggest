import React from 'react';
import './SongRecommendations.css';

const SongRecommendations = ({ recommendations = [] }) => {
  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="recommendations-container">
      <h3>Your Recommendations</h3>
      <ul>
        {recommendations.map((song, index) => (
          <li key={index}>
            <a href={song.url} target="_blank" rel="noopener noreferrer">
              {song.name} by {song.artist}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongRecommendations;
