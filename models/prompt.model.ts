import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "UserId is required!"]
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required!"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required!"],
  },
});

const PromptModel = models.Prompt || model("Prompt", PromptSchema);

export default PromptModel;
