const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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

// transactionSchema.index({
//     transactionId: 1
// });

module.exports = mongoose.model('Tag', tagSchema);
