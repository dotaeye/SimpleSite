import mongoose from 'mongoose';

var BackgroundSchema = new mongoose.Schema({
    url: String,
    active: Boolean,
    created: {type: Date, default: Date.now}
});

var Background = mongoose.model('Backgrounds', BackgroundSchema, 'Backgrounds');

export default Background;

