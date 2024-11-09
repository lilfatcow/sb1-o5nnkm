const express = require('express');
const moniteService = require('../services/monite');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const payables = await moniteService.getPayables(req.entityId, req.query);
    res.json(payables);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const payable = await moniteService.createPayable(req.entityId, req.body);
    res.status(201).json(payable);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const payable = await moniteService.getPayableById(req.entityId, req.params.id);
    res.json(payable);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const payable = await moniteService.updatePayable(req.entityId, req.params.id, req.body);
    res.json(payable);
  } catch (error) {
    next(error);
  }
});

module.exports = router;