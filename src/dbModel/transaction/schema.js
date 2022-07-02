const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
    {
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
// transactionSchema.index({
//     transactionId: 1
// });

module.exports = mongoose.model('Transaction', transactionSchema);
