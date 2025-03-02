import { Expense } from '@/schemas'
import { createObjectId } from '@/utils/string'

export const getSummary = async (
  start: Date,
  end: Date,
  userId: string,
  matchValue: object,
) => {
  return Expense.aggregate([
    {
      $match: {
        date: { $gte: start, $lte: end },
        value: matchValue,
        user: createObjectId(userId),
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: '$value' },
      },
    },
    {
      $project: {
        _id: 0,
        total: 1,
      },
    },
  ])
}

export const getSumByMonths = (start: Date, end: Date, userId: string) => {
  return Expense.aggregate([
    {
      $match: {
        date: { $gte: start, $lte: end },
        user: createObjectId(userId),
      },
    },
    {
      $group: {
        _id: { $month: '$date' },
        total: { $sum: '$value' },
      },
    },
    {
      $project: {
        _id: 0,
        month: '$_id',
        total: 1,
      },
    },
    {
      $sort: {
        month: 1,
      },
    },
  ])
}
