import mongoose, { model, Schema } from 'mongoose'
import { ExpenseSchema } from './mongModels/expense'
import { TagSchema } from './mongModels/tag'
import { UserSchema } from './mongModels/user'

export const Expense =
  mongoose.models.Expenses || model('Expenses', ExpenseSchema)

export const Tag = mongoose.models.Tags || model('Tags', TagSchema)
export const User = mongoose.models.Users || model('Users', UserSchema)
