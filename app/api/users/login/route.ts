import { connectDB } from "@/config/db";
import { User } from "@/schemas";
import { loginValidation } from "@/yupSchemas/user";
import { ValidationError } from "yup";
import { signToken } from "@/utils/jwt";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await loginValidation.validate(body, {
      abortEarly: false,
      disableStackTrace: true,
    });
    await connectDB();
    const seekedUser = await User.findOne({
      email: body.email,
      password: body.password,
    });
    if (!seekedUser) {
      return Response.json(null, { status: 404 });
    } else {
      const user = seekedUser.toObject ? seekedUser.toObject() : seekedUser;
      if (user.password) delete user.password;
      const token = signToken({ id: user._id });
      return Response.json({ user, token });
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      return Response.json(error, { status: 400 });
    } else {
      return Response.json(error, { status: 500 });
    }
  }
}
