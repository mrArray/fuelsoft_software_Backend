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
      required: true,
      max: 255
    },
    company_address: {
      type: String,
      unique: true,
      required: true
    },
    company: {
      type: String,
      max: 255,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    phone_number: {
      type: Number,
      required: true,
      // max: 11
    },
    state: {
      type: String,
      required: true
    },
    multistation: { 
      type: Boolean,
      //  enum: ['Yes', 'No'],
       required: true

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
