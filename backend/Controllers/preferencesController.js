const User = require('../models/User');

exports.getPreferences = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user.preferences);
    } catch (err) {
        res.status(400).send('Error fetching preferences');
    }
};

exports.updatePreferences = async (req, res) => {
    const { preferences } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { preferences },
            { new: true }
        );
        res.json(user.preferences);
    } catch (err) {
        res.status(400).send('Error updating preferences');
    }
};
