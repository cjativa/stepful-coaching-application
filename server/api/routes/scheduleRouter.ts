import { Router } from "express";

import { ScheduleController } from "../controllers";

const ScheduleRouter = Router();

ScheduleRouter.get("/", ScheduleController.handleFetchForCoach);
ScheduleRouter.get("/student", ScheduleController.handleFetchForStudent);
ScheduleRouter.post("/", ScheduleController.handleCreate);
ScheduleRouter.post("/book", ScheduleController.handleBook);
ScheduleRouter.post("/complete", ScheduleController.handleCompletion);

export { ScheduleRouter };
