import { Schema } from 'mongoose'

export const UserSchema = new Schema({
  name: String,
  email: String,
  image: String,
  password: String,
  createdAt: Date,
  updatedAt: Date,
})
