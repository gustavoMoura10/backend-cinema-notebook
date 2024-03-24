import Users from "../database/models/Users.js";
import ErrorSearch from "../errors/ErrorSearch.js";
import ErrorUnauthorized from "../errors/ErrorUnauthorized.js";
import { decodeJWT } from "../utils.js";

async function jwtToken(req, resp, next) {
  try {
    const authorization =
      req.headers["authorization"] || req.headers["Authorization"] || "";
    const token = `${authorization}`.split("Bearer").pop().trim();
    if (!token) {
      throw new ErrorUnauthorized("Missing Authorization Token");
    }
    const decoded = decodeJWT(token);
    let user = await Users.findById(decoded._id);
    user = user.toJSON();
    if (!user) {
      throw new ErrorSearch("User not found!");
    }
    req.headers["_id"] = user._id;
    req.headers["admin"] = user.admin;
    next();
  } catch (error) {
    next(error);
  }
}
async function isAdmin(req, resp, next) {
  try {
    const admin = Boolean(req.headers["admin"]);
    if (!admin) {
      throw new ErrorUnauthorized("User is not an admin");
    }
    next();
  } catch (error) {
    next(error);
  }
}
async function isYou(req, resp, next) {
  try {
    if (req.headers["_id"] !== req.params["_id"]) {
      throw new ErrorUnauthorized("User not allowed to do this");
    }
    next();
  } catch (error) {
    next(error);
  }
}
export { jwtToken, isAdmin, isYou };
