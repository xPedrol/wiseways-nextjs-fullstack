import { auth } from '@/auth'
import { connectDB } from '@/config/db'
import { User } from '@/schemas'
import { createUserValidation } from '@/yupSchemas/user'
import { faker } from '@faker-js/faker'
import { ValidationError } from 'yup'

export async function GET() {
  const session = await auth()
  return Response.json(session)
}
export async function POST(request: Request) {
  try {
    let body = await request.json()
    body = { ...body, image: faker.image.avatar() }
    await createUserValidation.validate(body, {
      abortEarly: false,
      disableStackTrace: true,
    })
    await connectDB()
    const user = await User.create(body)
    if (user) {
      delete user.password
    }
    return Response.json(user)
  } catch (error) {
    if (error instanceof ValidationError) {
      return Response.json(error, { status: 400 })
    }
    return Response.json(error, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    await createUserValidation.validate(body, {
      abortEarly: false,
      disableStackTrace: true,
    })
    await connectDB()
    const seeked = await User.findOne({
      email: body.email,
      password: body.password,
    })
    if (!seeked) return Response.json(null, { status: 404 })
    delete body.password
    delete body.email
    const user = await User.updateOne({ _id: seeked._id }, body)
    if (user.modifiedCount > 0 || user.matchedCount > 0) {
      return Response.json('Tôtomanobrahmaaquinobar')
    }
    return Response.json(null, { status: 400 })
  } catch (error) {
    if (error instanceof ValidationError) {
      return Response.json(error, { status: 400 })
    }
    return Response.json(error, { status: 500 })
  }
}
