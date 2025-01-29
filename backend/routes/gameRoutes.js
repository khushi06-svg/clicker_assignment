import express from 'express';
import User from '../models/userModel.js';
import { handleClick } from '../jobs/gameLogic.js';

const router = express.Router();

router.get('/users/:username', async (req, res) => {
    const { username } = req.params;
    let user = await User.findOne({ username });

    if (!user) {
        user = new User({ username });
        await user.save();
    }

    res.json(user);
});

router.post('/click/:username', async (req, res) => {
    const { username } = req.params;
    let user = await User.findOne({ username });

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const { points, prizeWon } = handleClick();
    user.counter += points;
    if (prizeWon) user.prizes += 1;

    await user.save();

    res.json({ counter: user.counter, prizes: user.prizes, prizeWon });
});

router.get('/leaderboard', async (req, res) => {
    const leaderboard = await User.find().sort({ counter: -1 }).limit(10);
    res.json(leaderboard);
});

router.post('/users', async (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    let user = await User.findOne({ username });

    if (!user) {
        user = new User({ username });
        await user.save();
    }

    res.json(user);
});

export default router;
