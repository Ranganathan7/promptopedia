import { connectToDb } from "../../../utils/database.connection";
import PromptModel from "../../../models/prompt.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDb();
    const prompts = await PromptModel.find({})
      .sort({ updatedAt: "desc" })
      .populate("userId")
      .exec();
    return NextResponse.json(
      {
        prompts: prompts,
        message: "Fetched all prompts successfully!",
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch all prompts!" },
      {
        status: 500,
      }
    );
  }
};
