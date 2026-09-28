import { Router } from "express";
import { shortenUrl, redirectToOriginal } from "../controllers/link/link.controller.js";

const linksRouter = Router();

linksRouter.post("/", shortenUrl);

linksRouter.get("/:hash", redirectToOriginal)

export default linksRouter;