import { auth } from '@/auth'
import { connectDB } from '@/config/db'
import { Expense } from '@/schemas'
import { getEndOfMonth, getStartOfMonth } from '@/utils/date'
import { createExpenseValidation } from '@/yupSchemas/expense'
import { ValidationError } from 'yup'

export async function POST(request: Request) {
  const session = await auth()
  try {
    if (!session || !session?.user?.id) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 })
    }
    let body = await request.json()
    if (!('date' in body)) {
      body = { ...body, date: new Date() }
    }
    createExpenseValidation.validate(body, {
      abortEarly: false,
      disableStackTrace: true,
    })
    body.user = session.user.id
    await connectDB()
    const expense = await Expense.create(body)
    return Response.json(expense)
  } catch (error) {
    if (error instanceof ValidationError) {
      return Response.json({ error }, { status: 400 })
    } else {
      return Response.json(error, { status: 500 })
    }
  }
}

export async function GET(request: Request) {
  const session = await auth()
  try {
    if (!session || !session?.user?.id) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 })
    }
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    if (!date || isNaN(Date.parse(date))) {
      return Response.json({ message: 'Invalid date' }, { status: 400 })
    }
    await connectDB()
    const expenses = await Expense.find({
      user: session.user.id,
      date: {
        $gte: getStartOfMonth(date),
        $lte: getEndOfMonth(date),
      },
    }).populate('tag')
    return Response.json(expenses)
  } catch (error) {
    return Response.json(error, { status: 500 })
  }
}
