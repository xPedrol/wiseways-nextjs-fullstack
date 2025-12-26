import { getUserIdFromRequest } from "@/utils/jwt";
import { connectDB } from "@/config/db";
import { getSumByTags } from "@/modelsUtils/expense";
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
    const result = await getSumByTags(start, end, userId);
    return Response.json(result);
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}
