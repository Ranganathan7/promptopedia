import UserModel from "../../../../models/user.model";
import { connectToDb } from "../../../../utils/database.connection";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDb();
    const user = await UserModel.findById(params.id).exec();
    return NextResponse.json(
      { user: user, message: "Fetched user successfully!" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch user!" },
      { status: 500 }
    );
  }
};
