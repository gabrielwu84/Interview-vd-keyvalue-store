let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// define schema
let ObjectSchema = new Schema(
    {
        key: { type: String, trim:true, required: true },
        value: { type: Object, required: true },
        timestamp: { type: Date, default: Date.now, required: true },
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('object', ObjectSchema);