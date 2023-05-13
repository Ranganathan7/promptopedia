import UserModel from "../../../../models/user.model";
import { connectToDb } from "../../../../utils/database.connection";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDb();
    const user = await UserModel.findById(params.id);
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify("Failed to fetch user!"), { status: 500 });
  }
};
