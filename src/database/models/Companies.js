import { Schema } from "mongoose";
import { getConnection } from "../connection.js";

const companiesSchema = new Schema(
  {
    name: { type: String, required: true },
    country: { type: Schema.Types.ObjectId, ref: "countries", required: true }
  },
  {
    timestamps: true
  }
);

export default getConnection().model("companies", companiesSchema);
