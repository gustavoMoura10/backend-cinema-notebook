import { Schema } from "mongoose";
import { getConnection } from "../connection.js";
import bcrypt from "bcryptjs";
const saltRounds = 10;

const usersSchema = new Schema(
  {
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
    imagePath: { type: String }
  },
  {
    timestamps: true
  }
);
usersSchema.pre("save", function (next) {
  const password = bcrypt.hashSync(this.password, saltRounds);
  this.password = password;
  next();
});
export default getConnection().model("users", usersSchema);
