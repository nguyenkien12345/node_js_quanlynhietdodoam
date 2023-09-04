const mongoose = require('mongoose');
const { connection } = require('../connect');

const dataSchema = new mongoose.Schema({
    temperature: {
        type: Number,
        required: [true, 'Temperature is required'],
    },
    humidity: {
        type: Number,
        required: [true, 'Humidity is required'],
    },
    dust: {
        type: Number,
    },
    air: {
        type: Number,
    },
    active: {
        type: Boolean,
        default: true
    },
    date: {
        type: String,
    },
    time: {
        type: String
    }
}, { timestamps: true });

mongoose.SchemaTypes.String.set('trim', true);

module.exports = connection.model('data', dataSchema);
