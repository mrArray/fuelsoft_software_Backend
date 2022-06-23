const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fuelStationSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
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
