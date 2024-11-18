const axios = require('axios');
const User = require('../models/User');

exports.getRecommendations = async (req, res) => {
    const { userMessage } = req.body;

    try {
        const openaiResponse = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: 'You are a music recommendation assistant.' },
                    { role: 'user', content: userMessage },
                ],
            },
            {
                headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
            }
        );

        const userPreferences = openaiResponse.data.choices[0].message.content;

        const spotifyResponse = await axios.get('https://api.spotify.com/v1/recommendations', {
            params: { seed_genres: 'pop,rock', limit: 5 },
            headers: { Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}` },
        });

        const recommendations = spotifyResponse.data.tracks.map((track) => ({
            name: track.name,
            artist: track.artists.map((artist) => artist.name).join(', '),
            url: track.external_urls.spotify,
        }));

        const user = await User.findById(req.user.id);
        user.chatHistory.push({ message: userMessage, response: userPreferences });
        user.songHistory.push(...recommendations);
        await user.save();

        res.json({ recommendations });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error processing request');
    }
};
