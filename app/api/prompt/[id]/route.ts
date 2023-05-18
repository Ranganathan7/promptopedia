import { connectToDb } from "../../../../utils/database.connection";
import PromptModel from "../../../../models/prompt.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDb();
    const prompt = await PromptModel.findById(params.id).populate("userId").exec();
    if (!prompt) {
      return NextResponse.json({ error: "Prompt not found!" }, { status: 400 });
    }
    return NextResponse.json(
      { prompt: prompt, message: "Fetched prompt successfully!" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch prompt!" },
      { status: 500 }
    );
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { prompt, tag } = await req.json();
  console.log(prompt, tag, params.id);
  try {
    await connectToDb();
    const existingPrompt = await PromptModel.findById(params.id).exec();
    if (!existingPrompt) {
      return NextResponse.json({ error: "Prompt not found!" }, { status: 400 });
    }
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return NextResponse.json(
      { prompt: existingPrompt, message: "Updated prompt successfully!" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update prompt!" },
      {
        status: 500,
      }
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDb();
    await PromptModel.findByIdAndRemove(params.id).exec();
    return NextResponse.json(
      { message: "Deleted prompt successfully!" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete prompt!" },
      {
        status: 500,
      }
    );
  }
};
