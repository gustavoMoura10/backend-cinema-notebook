import { Schema } from "mongoose";
import { getConnection } from "../connection.js";

const genresSchema = new Schema(
  {
    name: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

export default getConnection().model("genres", genresSchema);
