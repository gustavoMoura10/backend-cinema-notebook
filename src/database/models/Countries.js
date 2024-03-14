import { Schema } from "mongoose";
import { getConnection } from "../connection.js";

const countriesSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    acronym: {
      type: String,
      required: true,
      maxLength: 3,
      uppercase: true,
      unique: true
    },
    imagePath: { type: String }
  },
  {
    timestamps: true
  }
);

export default getConnection().model("countries", countriesSchema);
