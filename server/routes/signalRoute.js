const express = require('express');

const {
  createSignal,
  getSignals,
  getSignal,
  updateSignal,
  deleteSignal,
} = require('../controllers/signalController');

const router = express.Router();

router.post('/', createSignal);

router.get('/', getSignals);

router.get('/:id', getSignal);

router.put('/:id', updateSignal);

router.delete('/:id', deleteSignal);

module.exports = router;
