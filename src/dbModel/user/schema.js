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
// const transactionSchema = new Schema({
//     fields: [
//         {
//             UserId: {
//                 type: Number,
//                 required: true
//             },
//             Tag: {
//                 type: String,
//                 required: true
//             },
//             TotalAmount: {
//                 type: Number,
//                 required: true
//             },
//             TotalVolume: {
//                 type: Number,
//                 required: true
//             },
//             Amount: {
//                 type: Number,
//                 required: true
//             },
//             Price: {
//                 type: Number,
//                 required: true
//             },
//             TCVolume: {
//                 type: Number,
//                 required: true
//             },
//             Volume: {
//                 type: Number,
//                 unique: true,
//                 required: true
//             },
//             Transaction: {
//                 type: Number,
//                 required: true
//             },
//             Nozzle: {
//                 type: Number,
//                 required: true
//             },
//             Pump: {
//                 type: Number,
//                 required: true
//             },
//             DateTime: {
//                 type: String,
//                 required: true
//             },
//             DateTimeStart: {
//                 type: String,
//                 required: true
//             },
//             Pushed: {
//                 type: Boolean,
//                 required: true,
//                 default:true
//             },
//         }
//     ]
// },

//     {
//         // toJSON: {
//         //   virtuals: true
//         // },
//         // toObject: {
//         //   virtuals: true
//         // },
//         timestamps: true
//     }
// );


const transactionSchema = new Schema({
   
            UserId: {
                type: Number,
                required: true
            },
            Tag: {
                type: String,
                required: true
            },
            TotalAmount: {
                type: Number,
                required: true
            },
            TotalVolume: {
                type: Number,
                required: true
            },
            Amount: {
                type: Number,
                required: true
            },
            Price: {
                type: Number,
                required: true
            },
            TCVolume: {
                type: Number,
                required: true
            },
            Volume: {
                type: Number,
                unique: true,
                required: true
            },
            Transaction: {
                type: Number,
                required: true
            },
            Nozzle: {
                type: Number,
                required: true
            },
            Pump: {
                type: Number,
                required: true
            },
            DateTime: {
                type: String,
                required: true
            },
            DateTimeStart: {
                type: String,
                required: true
            },
            Pushed: {
                type: Boolean,
                required: true,
                default:true,
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

const pumpDetailSchema = new Schema(
    {
        pumpDetail_address: {
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

const pumpSchema = new Schema(
    {
        Id: {
            type: Number,
            required: true
        },
        Port: {
            type: Number,
            required: true
        },
        Address: {
            type: Number,
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

const tagSchema = new Schema(
    {


        Tag: {
            type: String,
            required: true
        },
        Name: {
            type: String,
            required: true
        },
        Valid: {
            type: Boolean,
            required: true
        }


    },
    {

        timestamps: true
    }
);

userSchema.index({
    userId: 1
});




module.exports = mongoose.model("User", userSchema);
module.exports = mongoose.model('Branch', branchSchema);
module.exports = mongoose.model('Transaction', transactionSchema);
module.exports = mongoose.model('PumpDetail', pumpDetailSchema);
module.exports = mongoose.model('Pump', pumpSchema);
module.exports = mongoose.model('Tag', tagSchema);




