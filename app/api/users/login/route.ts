import { connectDB } from '@/config/db'
import { User } from '@/schemas'
import { loginValidation } from '@/yupSchemas/user'
import { ValidationError } from 'yup'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    await loginValidation.validate(body, {
      abortEarly: false,
      disableStackTrace: true,
    })
    await connectDB()
    const seekedUser = await User.findOne({
      email: body.email,
      password: body.password,
    })
    if (!seekedUser) {
      return Response.json(null, { status: 404 })
    } else {
      return Response.json(seekedUser)
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      return Response.json(error, { status: 400 })
    } else {
      return Response.json(error, { status: 500 })
    }
  }
}
