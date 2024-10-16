import { Router } from "express";

import { ScheduleController } from "../controllers";

const ScheduleRouter = Router();

// Below two routes use POST because we're not doing any JWT or session persistence
// to maintain some state for the request, and just providing the user id to fetch for
ScheduleRouter.post("/coach", ScheduleController.handleFetchForCoach);
ScheduleRouter.post("/student", ScheduleController.handleFetchForStudent);

ScheduleRouter.post("/", ScheduleController.handleCreate);
ScheduleRouter.post("/book", ScheduleController.handleBook);
ScheduleRouter.post("/complete", ScheduleController.handleCompletion);

export { ScheduleRouter };
