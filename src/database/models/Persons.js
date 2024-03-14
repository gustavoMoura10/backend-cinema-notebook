import { Schema } from "mongoose";
import { getConnection } from "../connection.js";

const personsSchema = new Schema(
  {
    name: { type: String, required: true },
    biography: { type: String },
    gender: {
      type: String,
      enum: ["M", "F", "NB"],
      default: "NB"
    },
    birthday: { type: Date, required: true },
    deathday: { type: Date },
    nacionalities: [
      { type: Schema.Types.ObjectId, ref: "countries", required: true }
    ],
    imagePath: { type: String }
  },
  {
    timestamps: true
  }
);

export default getConnection().model("persons", personsSchema);
