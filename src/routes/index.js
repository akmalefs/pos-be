import { Router } from "express";
import userRouter from "./userRoutes.js";

const router = Router();

router.use("/api", userRouter);

export default router;
