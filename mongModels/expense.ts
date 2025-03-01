import mongoose, { model, Schema } from 'mongoose'
import { ref } from 'yup'

const ExpenseSchema = new Schema({
  description: String,
  value: Number,
  date: Date,
  tagId: {
    type: Schema.Types.ObjectId,
    ref: 'Tags',
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  createdAt: Date,
  updatedAt: Date,
})

const Expense = mongoose.models.Expenses || model('Expenses', ExpenseSchema)
export default Expense
