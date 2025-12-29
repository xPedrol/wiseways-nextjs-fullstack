import { connectDB } from "@/config/db";
import { User } from "@/schemas";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = (await params).id;
  await connectDB();
  const user = await User.findById(userId).select("-password");
  if (!user) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }
  return Response.json(user);
}
