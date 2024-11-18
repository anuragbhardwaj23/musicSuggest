import React, { useState } from 'react';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userMessage, setUserMessage] = useState('');
    const [chatResponse, setChatResponse] = useState(null);

    const handleLogin = async (username, password) => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) setIsLoggedIn(true);
            else alert('Login failed');
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const handleChat = async () => {
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userMessage }),
            });

            const data = await response.json();
            setChatResponse(data.recommendations);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="App">
            {!isLoggedIn ? (
                <div>
                    <h2>Login</h2>
                    <button onClick={() => handleLogin('testuser', 'password123')}>Login</button>
                </div>
            ) : (
                <div>
                    <textarea
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        placeholder="Tell me your mood or music preferences..."
                    />
                    <button onClick={handleChat}>Get Recommendations</button>
                    {chatResponse && (
                        <ul>
                            {chatResponse.map((track, index) => (
                                <li key={index}>
                                    <a href={track.url}>{track.name} by {track.artist}</a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;
