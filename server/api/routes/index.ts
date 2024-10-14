import { Router } from "express";
import { ScheduleRouter } from "./scheduleRouter";

const ApiRouter = Router();

ApiRouter.use("/schedule", ScheduleRouter);

export { ApiRouter };
