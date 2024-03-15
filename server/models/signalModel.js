const mongoose = require('mongoose');

const signalSchema = mongoose.Schema(
  {
    binaryCode: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Signal = mongoose.model('Signal', signalSchema);

module.exports = Signal;
