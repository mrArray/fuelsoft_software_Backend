const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fuelStationSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
    email: {
      type: String,
      require: true,
      min: 6,
      max: 255
    },
    address: {
      type: String,
      unique: true,
      required: true
    },
    company: {
      type: String,
      require: true,
      min: 6,
      max: 255

    },
    date: {
      type: Date,
      default: Date.now

    },
    dbURI: {
      type: String,
      trim: true,
      unique: true,
      required: true
    }
  },
  {
    // toJSON: {
    //   virtuals: true
    // },
    // toObject: {
    //   virtuals: true
    // },
    timestamps: true
  }
);

fuelStationSchema.index({
  fuelStationId: 1
});

module.exports = mongoose.model("FuelStation", fuelStationSchema);
