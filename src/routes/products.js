const express = require('express');
const api = require('../utils/api');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const response = await api.get('/products', { params: req.query });
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const response = await api.post('/products', req.body);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const response = await api.get(`/products/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const response = await api.patch(`/products/${req.params.id}`, req.body);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const response = await api.delete(`/products/${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;