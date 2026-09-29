import { Router } from "express";
import {
  redirectToOriginal,
  shortenUrl,
} from "../controllers/link/link.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import { linkSchema } from "../schemas/link.schema.js";

const linksRouter = Router();

linksRouter.post("/", validate({ body: linkSchema }), shortenUrl);

linksRouter.get("/:hash", redirectToOriginal);

export default linksRouter;
