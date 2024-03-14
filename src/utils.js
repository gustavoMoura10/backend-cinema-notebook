import jwt from "jsonwebtoken";
function generateJWT(obj) {
  const token = jwt.sign(obj, process.env.JWT_TOKEN, { expiresIn: "30d" });
  return token;
}
function decodeJWT(token) {
  const decoded = jwt.verify(token, process.env.JWT_TOKEN);
  return decoded;
}

export { generateJWT, decodeJWT };
