const express = require('express');
const api = require('../utils/api');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const response = await api.get('/counterparts', { params: req.query });
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const response = await api.post('/counterparts', req.body);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const response = await api.get(`/counterparts/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const response = await api.patch(`/counterparts/${req.params.id}`, req.body);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const response = await api.delete(`/counterparts/${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Counterpart contacts
router.get('/:id/contacts', async (req, res, next) => {
  try {
    const response = await api.get(`/counterparts/${req.params.id}/contacts`);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/contacts', async (req, res, next) => {
  try {
    const response = await api.post(`/counterparts/${req.params.id}/contacts`, req.body);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

// Counterpart bank accounts
router.get('/:id/bank-accounts', async (req, res, next) => {
  try {
    const response = await api.get(`/counterparts/${req.params.id}/bank_accounts`);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/bank-accounts', async (req, res, next) => {
  try {
    const response = await api.post(`/counterparts/${req.params.id}/bank_accounts`, req.body);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;