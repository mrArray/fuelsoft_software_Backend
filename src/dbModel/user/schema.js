const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      max: 255,
      required: true

    },
    phoneNumber: {
      type: String,
      require: true,
      max: 9

    },
    password: {
      type: String,
      require: true,

    },
  },




  // TODO: find out what these 2 options do
  {
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    },
    timestamps: true
  }
);

const branchSchema = new Schema(
  {
      branch_address: {
          type: String,
          required: true
      },
      no_of_storage_tank: {
          type: Number,
          required: true
      },
      mainboard_image: {
          type: String,
          unique: true,
          required: true
      },
      dispenser_brand: {
          type: String,
          unique: true,
          required: true
      },
      type_of_fuel: {
          type: String,
          unique: true,
          required: true
      },
      no_fuel_dispenser: {
          type: Number,
          unique: true,
          required: true
      },
      tank_height: {
          type: Number,
          unique: true,
          required: true
      },
      type_of_storage: {
          type: String,
          unique: true,
          required: true
      },
      attached_calib_chart: {
          type: String,
          unique: true,
          required: true
      },
      priceboard_brand: {
          type: String,
          unique: true,
          required: true
      },



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
userSchema.index({
  userId: 1
});




module.exports = mongoose.model("User", userSchema);
module.exports = mongoose.model('Branch', branchSchema);
