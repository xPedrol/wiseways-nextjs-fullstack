import { connectDB } from '@/config/db'
import Tag from '@/mongModels/tag'
import { createTagValidation } from '@/yupSchemas/tag'
import { faker } from '@faker-js/faker'
import { ValidationError } from 'yup'

export async function POST(request: Request) {
  try {
    let body = await request.json()
    body = { ...body, color: faker.color.rgb() }
    await createTagValidation.validate(body, {
      abortEarly: false,
      disableStackTrace: true,
    })
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
