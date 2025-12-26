import { getUserIdFromRequest } from "@/utils/jwt";
import { connectDB } from "@/config/db";
import { Expense } from "@/schemas";
import { isValidDate } from "@/utils/date";
import { createExpenseValidation } from "@/yupSchemas/expense";
import { ValidationError } from "yup";

export async function POST(request: Request) {
  const userId = await getUserIdFromRequest(request);
  try {
    if (!userId) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    let body = await request.json();
    if (!("date" in body)) {
      body = { ...body, date: new Date() };
    }
    body.user = userId;
    await createExpenseValidation.validate(body, {
      abortEarly: false,
      disableStackTrace: true,
    });
    await connectDB();
    const expense = await Expense.create(body);
    return Response.json(expense);
  } catch (error) {
    if (error instanceof ValidationError) {
      return Response.json({ error }, { status: 400 });
    } else {
      return Response.json(error, { status: 500 });
    }
  }
}

export async function PUT(request: Request) {
  const userId = await getUserIdFromRequest(request);
  try {
    if (!userId) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    await createExpenseValidation.validate(body, {
      abortEarly: false,
      disableStackTrace: true,
    });
    await connectDB();
    const expense = await Expense.updateOne(
      {
        _id: body._id,
        user: userId,
      },
      body
    );
    return Response.json(expense);
  } catch (error) {
    if (error instanceof ValidationError) {
      return Response.json({ error }, { status: 400 });
    } else {
      return Response.json(error, { status: 500 });
    }
  }
}

export async function GET(request: Request) {
  const userId = await getUserIdFromRequest(request);
  try {
    if (!userId) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (id) {
      await connectDB();
      const expense = await Expense.findOne({
        _id: id,
        user: userId,
      }).populate("tag");
      if (!expense) {
        return Response.json({ message: "Expense not found" }, { status: 404 });
      }
      return Response.json(expense);
    }
    const start = isValidDate(searchParams.get("start")) ?? new Date();
    const end = isValidDate(searchParams.get("end")) ?? new Date();

    await connectDB();
    const expenses = await Expense.find({
      user: userId,
      date: {
        $gte: start,
        $lte: end,
      },
    }).populate("tag");
    return Response.json(expenses);
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return Response.json({ message: "Id is required" }, { status: 400 });
    }
    await connectDB();
    const expense = await Expense.deleteOne({
      _id: id,
    });
    if (expense.deletedCount === 0) {
      return Response.json({ message: "Expense not found" }, { status: 404 });
    }
    return Response.json(expense);
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}
