import { connectToDb } from "../../../../utils/database.connection";
import PromptModel from "../../../../models/prompt.model";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDb();
    const prompt = await PromptModel.findById(params.id).populate("userId");
    if (!prompt) {
      return new Response("Prompt not found!", { status: 400 });
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch prompt!", { status: 500 });
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDb();
    const existingPrompt = await PromptModel.findById(params.id);
    if (!prompt) {
      return new Response(JSON.stringify("Prompt not found!"), { status: 400 });
    }
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify("Failed to update prompt!"), { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDb();
    await PromptModel.findByIdAndRemove(params.id);
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify("Failed to fetch prompts!"), { status: 500 });
  }
};
