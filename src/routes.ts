import type { Request, Response } from "express";
import { Router } from "express";
import { searchTicketsController } from "./UseCase/SearchTickets/index";

export const router = Router();

router.post("/tickets", async (req: Request, res: Response) => searchTicketsController.handle(req, res));