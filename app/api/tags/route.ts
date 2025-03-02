import { auth } from '@/auth'
import { connectDB } from '@/config/db'
import { Tag } from '@/schemas'
import { createTagValidation } from '@/yupSchemas/tag'
import { faker } from '@faker-js/faker'
import { ValidationError } from 'yup'

export async function GET() {
  try {
    await connectDB()
    const tags = await Tag.find()
    return Response.json(tags)
  } catch (error) {
    return Response.json(error, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await auth()
  try {
    if (!session || !session?.user?.id) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 })
    }
    const body = await request.json()
    body.user = session.user.id
    await createTagValidation.validate(body, {
      abortEarly: false,
      disableStackTrace: true,
    })
    if (!('color' in body)) {
      body.color = faker.color.rgb()
    }
    await connectDB()
    const tag = await Tag.create(body)
    return Response.json(tag)
  } catch (error) {
    if (error instanceof ValidationError) {
      return Response.json(error, { status: 400 })
    }
    return Response.json(error, { status: 500 })
  }
}
