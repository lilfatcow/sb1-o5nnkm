const express = require('express');
const moniteService = require('../services/monite');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const response = await moniteService.getEntities(req.entityId, req.query);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const entity = await moniteService.getEntity(req.params.id);
    res.json(entity);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const entity = await moniteService.updateEntity(req.params.id, req.body);
    res.json(entity);
  } catch (error) {
    next(error);
  }
});

module.exports = router;