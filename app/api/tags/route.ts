import { getUserIdFromRequest } from "@/utils/jwt";
import { connectDB } from "@/config/db";
import { Expense, Tag } from "@/schemas";
import { createTagValidation } from "@/yupSchemas/tag";
import { faker } from "@faker-js/faker";
import { ValidationError } from "yup";

export async function GET(request: Request) {
  const userId = await getUserIdFromRequest(request);
  try {
    if (!userId) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const tags = await Tag.find({
      user: userId,
    });
    const count = await Tag.countDocuments({
      user: userId,
    });
    return Response.json({
      tags,
      count,
    });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}

export async function POST(request: Request) {
  const userId = await getUserIdFromRequest(request);
  try {
    if (!userId) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    body.user = userId;
    await createTagValidation.validate(body, {
      abortEarly: false,
      disableStackTrace: true,
    });
    if (!("color" in body)) {
      body.color = faker.color.rgb();
    }
    await connectDB();
    const tag = await Tag.create(body);
    return Response.json(tag);
  } catch (error) {
    if (error instanceof ValidationError) {
      return Response.json(error, { status: 400 });
    }
    return Response.json(error, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return Response.json({ message: "Id é obrigatório." }, { status: 400 });
    }
    await connectDB();
    const expensesWithTag = await Expense.find({
      tag: id,
    });
    if (expensesWithTag.length > 0) {
      return Response.json(
        {
          message:
            "Não é possível excluir uma tag que está sendo usada em um registro.",
        },
        { status: 400 }
      );
    }
    const expense = await Tag.deleteOne({
      _id: id,
    });
    if (expense.deletedCount === 0) {
      return Response.json({ message: "Tag não encontrada." }, { status: 404 });
    }
    return Response.json(expense);
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}
