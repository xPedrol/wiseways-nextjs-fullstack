import { connectDB } from '@/config/db'
import Expense from '@/mongModels/expense'
import { createExpenseValidation } from '@/yupSchemas/expense'
import { ValidationError } from 'yup'

export async function POST(request: Request) {
  try {
    let body = await request.json()
    if (!('date' in body)) {
      body = { ...body, date: new Date() }
    }
    createExpenseValidation.validate(body, {
      abortEarly: false,
      disableStackTrace: true,
    })
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
