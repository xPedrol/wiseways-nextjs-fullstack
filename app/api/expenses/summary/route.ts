import { auth } from '@/auth'
import { connectDB } from '@/config/db'
import { getSummary } from '@/modelsUtils/expense'
import { isValidDate } from '@/utils/date'

export async function GET(request: Request) {
  const session = await auth()
  try {
    if (!session || !session?.user?.id) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const start = isValidDate(searchParams.get('start')) ?? new Date()
    const end = isValidDate(searchParams.get('end')) ?? new Date()
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
  } catch (error) {
    return Response.json(error, { status: 500 })
  }
}
