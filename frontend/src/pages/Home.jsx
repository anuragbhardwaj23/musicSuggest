import React from 'react';
import Chat from '../components/Chat';
import SongRecommendations from '../components/SongRecommendations';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to MusicSuggest</h1>
      <p>Get personalized music recommendations tailored just for you!</p>
      <Chat />
      <SongRecommendations />
    </div>
  );
};

export default Home;
