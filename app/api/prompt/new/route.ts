import { connectToDb } from "../../../../utils/database.connection";
import PromptModel from "@/models/prompt.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDb();
    const newPrompt = new PromptModel({
      userId: userId,
      tag: tag,
      prompt: prompt,
    });
    await newPrompt.save();
    return NextResponse.json(
      { prompt: newPrompt, message: "Created prompt successfully!" },
      {
        status: 201,
      }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create a new prompt" },
      { status: 500 }
    );
  }
};
