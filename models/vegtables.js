const mongoose = require('mongoose');

const vegtableSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    color: { type: String, required: true },
    img: String,
    readyToEat: Boolean,
  },
  {
    timestamps: true,
  }
);

const Vegtable = mongoose.model('Vegtable', vegtableSchema);

module.exports = Vegtable;