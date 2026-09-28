import { Router } from "express";
import { shortenUrl } from "../controllers/link/link.controller.js";

const linksRouter = Router();

linksRouter.post("/", shortenUrl)

export default linksRouter;