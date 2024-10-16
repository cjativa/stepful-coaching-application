import express from "express";
import bodyParser from "body-parser";
import { join } from "path";

import { ApiRouter } from "./api/routes";
import { Config } from "./config";

const LOG_PREFIX = "[Application]";

const application = express();
const build = join(__dirname, "../build");
const index = join(build, "index.html");
application.use(express.static(build, { index: false, etag: false }));

// Configure our API router
application.use(express.urlencoded({ extended: true }));
application.use(bodyParser.json());
application.use("/api", ApiRouter);

// Serve index on all requests to server.
application.get("*", (_: express.Request, response: express.Response) => {
  response.set({
    "Cache-Control": "private, no-cache, no-store, must-revalidate",
    Expires: "-1",
    Pragma: "no-cache",
  });

  response.sendFile(index);
});

// Configure the server start
application.listen(Config.port, () => {
  console.log(`${LOG_PREFIX} Server listening on port ${Config.port}`);
});

export { application };
