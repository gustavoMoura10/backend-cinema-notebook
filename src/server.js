import "dotenv/config.js";
import cors from "cors";
import express from "express";
import { validate } from "./database/connection.js";
import router from "./router.js";
import httpErrorResponse from "./middlewares/httpErrorResponse.js";
const app = express();
app.use(cors());
app.use(express.json());
const { PORT } = process.env;
(async () => {
  try {
    const validation = await validate();
    if (typeof validation === "string") {
      console.log(validation);
    }
    router(app);
    app.use(httpErrorResponse);
    app.use((req, resp) => {
      resp.status(200).send("CINEMA-NOTEBOOK API");
    });
  } catch (error) {
    console.log(error);
    app.use((req, resp) => {
      resp.status(500).send("Error on Server");
    });
  }
  app.listen(PORT, () => {
    console.log("LISTENING ON PORT:", PORT);
  });
})();
