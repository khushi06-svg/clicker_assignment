import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  counter: { type: Number, default: 0 },
  prizes: { type: Number, default: 0 }
});

export default mongoose.model('User', userSchema);
