const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fuelStationSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      max: 255
    },
    station_address: {
      type: String,
      unique: true,
      required: true,
    },
    company: {
      type: String,
      max: 255,
      required: true,

    },
    password: {
      type: String,
      required: true,

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
