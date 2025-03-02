import { auth } from '@/auth'
import { connectDB } from '@/config/db'
import { Expense } from '@/schemas'
import { getEndOfMonth, getStartOfMonth } from '@/utils/date'
import { createObjectId } from '@/utils/string'

const getSummary = async (
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

export async function GET(request: Request) {
  const session = await auth()
  try {
    if (!session || !session?.user?.id) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const date =
      searchParams.get('date') ?? new Date().toISOString().split('T')[0]
    if (date && !isNaN(Date.parse(date))) {
      const start = getStartOfMonth(date)
      const end = getEndOfMonth(date)
      await connectDB()
      const lossResult = await getSummary(start, end, session.user.id, {
        $lt: 0,
      })
      const gainResult = await getSummary(start, end, session.user.id, {
        $gt: 0,
      })
      const loss = lossResult.length > 0 ? lossResult[0].total : 0
      const gain = gainResult.length > 0 ? gainResult[0].total : 0
      const result = {
        loss,
        gain,
        total: gain + loss,
      }
      return Response.json(result)
    }
    return Response.json(
      { errors: [{ error: 'Data inválida.' }] },
      { status: 400 },
    )
  } catch (error) {
    return Response.json(error, { status: 500 })
  }
}
