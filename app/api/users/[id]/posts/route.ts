import { connectToDb } from "../../../../../utils/database.connection";
import PromptModel from "../../../../../models/prompt.model";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDb();
    const prompts = await PromptModel.find({ userId: params.id }).populate("userId");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify("Failed to fetch prompts!"), { status: 500 });
  }
};
