import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  created: {type: Date, default: Date.now}
});

UserSchema.plugin(passportLocalMongoose);

const Users = mongoose.model('Users', UserSchema, 'Users');

export default Users;