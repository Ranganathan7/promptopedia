import { connectToDb } from "../../../utils/database.connection";
import PromptModel from "../../../models/prompt.model";
import { NextRequest } from "next/server";
import { NextApiResponse } from "next";

export const GET = async (req: NextRequest, res: NextApiResponse) => {
  try {
    await connectToDb();
    const prompts = await PromptModel.find({}).populate("userId");
    const response = new Response(JSON.stringify(prompts), { status: 200 });
    response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate')
    return response;
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify("Failed to fetch prompts!"), {
      status: 500,
    });
  }
};
