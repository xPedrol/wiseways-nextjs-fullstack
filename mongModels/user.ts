import mongoose from 'mongoose'
const { Schema, model } = mongoose

const UserSchema = new Schema({
  name: String,
  email: String,
  image: String,
  password: String,
  createdAt: Date,
  updatedAt: Date,
})

const User = mongoose.models.Users || model('Users', UserSchema)
export default User
