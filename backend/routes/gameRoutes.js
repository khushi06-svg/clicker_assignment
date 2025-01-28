import express from 'express';
import User from '../models/userModel.js';
import { handleClick } from '../jobs/gameLogic.js';

const router = express.Router();

// Endpoint to get user data
router.get('/:username', async (req, res) => {
  const { username } = req.params;
  let user = await User.findOne({ username });

  if (!user) {
    user = new User({ username });
    await user.save();
  }

  res.json(user);
});

// Endpoint to handle button click
router.post('/click/:username', async (req, res) => {
  const { username } = req.params;
  let user = await User.findOne({ username });

  if (!user) {
    user = new User({ username });
  }

  const { points, prizeWon } = handleClick();
  user.counter += points;
  if (prizeWon) user.prizes += 1;

  await user.save();

  res.json({ counter: user.counter, prizes: user.prizes, prizeWon });
});

export default router;
