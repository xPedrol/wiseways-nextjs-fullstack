import { getUserIdFromRequest } from "@/utils/jwt";
import { connectDB } from "@/config/db";
import { getSumByMonths } from "@/modelsUtils/expense";
import { isValidDate } from "@/utils/date";

export async function GET(request: Request) {
  const userId = await getUserIdFromRequest(request);
  try {
    if (!userId) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const start = isValidDate(searchParams.get("start")) ?? new Date();
    const end = isValidDate(searchParams.get("end")) ?? new Date();
    await connectDB();
    const result = await getSumByMonths(start, end, userId);
    const months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    result.forEach((valor) => {
      months[valor.month - 1] = valor.total;
    });
    return Response.json(months);
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}
