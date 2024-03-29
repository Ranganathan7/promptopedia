import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email should be valid!"],
  },
  name: {
    type: String,
    required: [true, "Username is required!"],
  },
  image: {
    type: String,
  },
});

const UserModel = models.User || model("User", UserSchema);

export default UserModel;
