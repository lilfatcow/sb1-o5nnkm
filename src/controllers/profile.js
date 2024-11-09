const profileService = require('../services/profile');
const auditService = require('../services/audit');

class ProfileController {
  async getProfile(req, res, next) {
    try {
      const profile = await profileService.getProfile(req.user.id);
      res.json(profile);
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const updates = req.body;
      const profile = await profileService.updateProfile(req.user.id, updates);
      
      // Log the profile update
      await auditService.createLog(
        req.user.id,
        'update',
        'profile',
        req.user.id,
        { updates }
      );

      res.json(profile);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProfileController();