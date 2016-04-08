import mongoose from 'mongoose';

var UserSchema = new mongoose.Schema({
    username: String,
    password: {type: String},
    created: {type: Date, default: Date.now}
});

UserSchema.set('toJSON', { hide: 'password' });

var Users = mongoose.model('Users', UserSchema, 'Users');

export default Users;