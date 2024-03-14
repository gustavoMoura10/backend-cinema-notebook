import moviesRoute from "./routes/moviesRoute.js";
import personsRoute from "./routes/personsRoute.js";
import countriesRoute from "./routes/countriesRoute.js";
import rolesRoute from "./routes/rolesRoute.js";
import companiesRoute from "./routes/companiesRoute.js";
import genresRoute from "./routes/genresRoute.js";
import usersRoute from "./routes/usersRoute.js";
import { jwtToken } from "./middlewares/authorization.js";
const router = (app) => {
  app.use("/movies", jwtToken, moviesRoute);
  app.use("/persons", jwtToken, personsRoute);
  app.use("/countries", jwtToken, countriesRoute);
  app.use("/roles", jwtToken, rolesRoute);
  app.use("/companies", jwtToken, companiesRoute);
  app.use("/genres", jwtToken, genresRoute);
  app.use("/users", usersRoute);
};

export default router;
