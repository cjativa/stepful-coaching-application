import { Router } from "express";
import { ScheduleRouter } from "./scheduleRouter";
import { LoginRouter } from "./loginRouter";

const ApiRouter = Router();

ApiRouter.use("/schedule", ScheduleRouter);
ApiRouter.use("/login", LoginRouter);

export { ApiRouter };
