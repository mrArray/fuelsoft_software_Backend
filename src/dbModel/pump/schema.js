
  const mongoose = require("mongoose");
  const Schema = mongoose.Schema;
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
  
  // pumpDetailSchema.index({
  //     pumpDetailId: 1
  // });
  
  module.exports = mongoose.model('Pump', pumpSchema);
  