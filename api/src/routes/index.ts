import { Router } from "express";
import auth from "./auth";
import usuario from "./usuario";
import evento from "./evento";

const routes = Router();

routes.use("/auth", auth);
routes.use("/usuario", usuario);
routes.use("/evento", evento);

export default routes;
