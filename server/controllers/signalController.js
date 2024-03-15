const Signal = require('../models/signalModel');

const createSignal = async (req, res) => {
  try {
    const signal = await Signal.create(req.body);
    res.status(200).json(signal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSignals = async (req, res) => {
  try {
    const signals = await Signal.find({});
    res.status(200).json(signals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSignal = async (req, res) => {
  try {
    const { id } = req.params;
    const signal = await Signal.findById(id);
    res.status(200).json(signal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSignal = async (req, res) => {
  try {
    const { id } = req.params;
    const signal = await Signal.findByIdAndUpdate(id, req.body);
    if (!signal) {
      return res
        .status(404)
        .json({ message: `cannot find any signal with ID ${id}` });
    }
    const updatedSignal = await Signal.findById(id);
    res.status(200).json(updatedSignal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSignal = async (req, res) => {
  try {
    const { id } = req.params;
    const signal = await Signal.findByIdAndDelete(id);
    if (!signal) {
      return res
        .status(404)
        .json({ message: `cannot find any signal with ID ${id}` });
    }
    res.status(200).json(signal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSignal,
  getSignals,
  getSignal,
  updateSignal,
  deleteSignal,
};
