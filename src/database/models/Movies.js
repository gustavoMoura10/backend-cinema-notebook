import { Schema } from "mongoose";
import { getConnection } from "../connection.js";
const movieSchema = new Schema(
  {
    title: { type: String, required: true },
    originalLanguage: {
      type: String,
      required: true,
      maxLength: 3,
      uppercase: true
    },
    description: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    runtime: { type: Number, required: true, min: 1 },
    imagePath: { type: String },
    crew: [
      {
        person: { type: Schema.Types.ObjectId, ref: "persons" },
        role: { type: Schema.Types.ObjectId, ref: "roles" }
      }
    ],
    companies: [{ type: Schema.Types.ObjectId, ref: "companies" }],
    genres: [{ type: Schema.Types.ObjectId, ref: "genres" }]
  },
  {
    timestamps: true
  }
);

export default getConnection().model("movies", movieSchema);
