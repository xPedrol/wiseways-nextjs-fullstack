import { Schema } from 'mongoose'

export const TagSchema = new Schema({
  name: String,
  description: String,
  color: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  createdAt: Date,
  updatedAt: Date,
})
