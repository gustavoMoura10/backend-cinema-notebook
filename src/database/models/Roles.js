import { Schema } from "mongoose";
import { getConnection } from "../connection.js";

const rolesSchema = new Schema(
  {
    function: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

export default getConnection().model("roles", rolesSchema);
