const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

// branchSchema.index({
//     branchId: 1
// });

module.exports = mongoose.model('Branch', branchSchema);
