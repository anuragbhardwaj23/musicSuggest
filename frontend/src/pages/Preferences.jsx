import React, { useState } from 'react';
import axios from '../services/api';
import '../styles/preferences.css';

const Preferences = () => {
  const [preferences, setPreferences] = useState({
    genre: '',
    artist: '',
    mood: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences({ ...preferences, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/preferences', preferences);
      alert('Preferences updated successfully!');
    } catch (err) {
      console.error('Error updating preferences:', err);
      alert('Failed to update preferences.');
    }
  };

  return (
    <div className="preferences-container">
      <h2>Set Your Music Preferences</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Favorite Genre:
          <input
            type="text"
            name="genre"
            value={preferences.genre}
            onChange={handleChange}
          />
        </label>
        <label>
          Favorite Artist:
          <input
            type="text"
            name="artist"
            value={preferences.artist}
            onChange={handleChange}
          />
        </label>
        <label>
          Preferred Mood:
          <input
            type="text"
            name="mood"
            value={preferences.mood}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save Preferences</button>
      </form>
    </div>
  );
};

export default Preferences;
