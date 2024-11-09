const auditService = require('../services/audit');

class AuditController {
  async getLogs(req, res, next) {
    try {
      const filters = {
        userId: req.query.userId,
        entityType: req.query.entityType,
        entityId: req.query.entityId,
        action: req.query.action
      };

      const logs = await auditService.getLogs(filters);
      res.json(logs);
    } catch (error) {
      next(error);
    }
  }

  async getLog(req, res, next) {
    try {
      const logs = await auditService.getLogs({
        entityId: req.params.id
      });
      
      if (!logs || logs.length === 0) {
        return res.status(404).json({
          error: {
            message: 'Audit log not found'
          }
        });
      }

      res.json(logs[0]);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuditController();