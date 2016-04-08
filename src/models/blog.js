import mongoose from 'mongoose';

var BlogSchema = new mongoose.Schema({
    title: String,
    metaTitle: String,
    metaDesc: String,
    content: String,
    publish: Boolean,
    url: String,
    imageUrl: String,
    created: {type: Date, default: Date.now},
    updated: {type: Date, default: Date.now}
});

var Blog = mongoose.model('Blogs', BlogSchema, 'Blogs');

export default Blog;

