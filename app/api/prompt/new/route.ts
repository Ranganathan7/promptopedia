import { connectToDb } from "../../../../utils/database.connection";
import PromptModel from "@/models/prompt.model";
import { NextRequest } from "next/server";

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
    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ message: "Failed to create a new prompt", error: err }),
      { status: 500 }
    );
  }
};
