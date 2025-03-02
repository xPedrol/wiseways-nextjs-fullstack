import { Schema } from 'mongoose'

export const ExpenseSchema = new Schema({
  description: String,
  value: Number,
  date: Date,
  tag: {
    type: Schema.Types.ObjectId,
    ref: 'Tags',
    required: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  createdAt: Date,
  updatedAt: Date,
})
