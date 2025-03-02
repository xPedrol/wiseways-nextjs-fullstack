import mongoose, { model } from 'mongoose'
import { ExpenseSchema } from './models/expense'
import { TagSchema } from './models/tag'
import { UserSchema } from './models/user'

export const Expense =
  mongoose.models.Expenses || model('Expenses', ExpenseSchema)

export const Tag = mongoose.models.Tags || model('Tags', TagSchema)
export const User = mongoose.models.Users || model('Users', UserSchema)
