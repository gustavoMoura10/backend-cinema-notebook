import mongoose from "mongoose";
const pass = process.env.MONGODB_PASSWORD;
const usr = process.env.MONGODB_USER;
const port = process.env.MONGODB_PORT;
const host = process.env.MONGODB_HOST;
const db = process.env.MONGODB_DATABASE;
const url = `mongodb://${usr}:${encodeURIComponent(
  pass
)}@${host}:${port}/${db}?authSource=admin&directConnection=true`;
const connection = mongoose.createConnection(url);
function getConnection() {
  return connection;
}
async function validate() {
  const conn = await getConnection();
  return new Promise(function (resolve, reject) {
    if (!conn) {
      reject(new Error("No connection found"));
    }
    conn.once("open", () => {
      resolve("CONNECTION OPEN!");
    });
    conn.on("error", (err) => {
      reject(err);
    });
  });
}
export { getConnection, validate };
