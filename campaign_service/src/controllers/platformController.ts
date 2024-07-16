import { Router } from "express";

// controller
import accountController from "./accountController";

const router = Router();

router.use("/:platformId/accounts", accountController);

export default router;
