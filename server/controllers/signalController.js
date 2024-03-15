const asyncHandler = require('express-async-handler');
const Signal = require('../models/signalModel');

const createSignal = asyncHandler(async (req, res) => {
  try {
    const signal = await Signal.create(req.body);
    res.status(200).json(signal);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const getSignals = asyncHandler(async (req, res) => {
  try {
    const signals = await Signal.find({});
    res.status(200).json(signals);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const getSignal = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const signal = await Signal.findById(id);
    res.status(200).json(signal);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const updateSignal = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const signal = await Signal.findByIdAndUpdate(id, req.body);
    if (!signal) {
      return res
        .status(404)
        .json({ message: `ID ${id}에 해당하는 신호를 찾을 수 없어요` });
      // TODO: 미들웨어 사용시 404가 아닌 500이 뜨는 문제
      //   throw new Error(`ID ${id}에 해당하는 신호를 찾을 수 없어요`);
    }
    const updatedSignal = await Signal.findById(id);
    res.status(200).json(updatedSignal);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const deleteSignal = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const signal = await Signal.findByIdAndDelete(id);
    if (!signal) {
      return res
        .status(404)
        .json({ message: `ID ${id}에 해당하는 신호를 찾을 수 없어요` });
      //   throw new Error(`ID ${id}에 해당하는 신호를 찾을 수 없어요`);
    }
    res.status(200).json(signal);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  createSignal,
  getSignals,
  getSignal,
  updateSignal,
  deleteSignal,
};
