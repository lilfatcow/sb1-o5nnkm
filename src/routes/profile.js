const express = require('express');
const profileService = require('../services/profile');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const profile = await profileService.getProfile(req.user.id);
    res.json(profile);
  } catch (error) {
    next(error);
  }
});

router.patch('/', async (req, res, next) => {
  try {
    const updates = req.body;
    const profile = await profileService.updateProfile(req.user.id, updates);
    res.json(profile);
  } catch (error) {
    next(error);
  }
});

router.post('/avatar', async (req, res, next) => {
  try {
    const { file } = req;
    const profile = await profileService.updateAvatar(req.user.id, file);
    res.json(profile);
  } catch (error) {
    next(error);
  }
});

module.exports = router;