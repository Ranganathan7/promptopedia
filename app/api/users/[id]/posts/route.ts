import { connectToDb } from "../../../../../utils/database.connection";
import PromptModel from "../../../../../models/prompt.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDb();
    const prompts = await PromptModel.find({ userId: params.id })
      .sort({ updatedAt: "desc" })
      .populate("userId")
      .exec();
    return NextResponse.json(
      { prompts: prompts, message: "Fetched user's prompts successfully!" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch prompts!" },
      { status: 500 }
    );
  }
};
