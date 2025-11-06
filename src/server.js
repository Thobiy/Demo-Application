// src/server.js

/* initial setup

import express from "express";
import vhost from "vhost";
import mainApp from "./mainApp.js";
import adminApp from "./adminApp.js";
import { APP_CONFIG } from "./config/config.js";

const app = express();

app.use(vhost("localhost", mainApp));
app.use(vhost("127.0.0.1", mainApp));
app.use(vhost("admin.localhost", adminApp));

console.log("Views folder:", app.get("views"));

(async () => {
  try {
    // initialize (connect DB, Redis, verify mailer, setup logger)
    await APP_CONFIG.init();

    app.listen(APP_CONFIG.ENV.PORT, () => {
      APP_CONFIG.LOGGER.info(`Nutrismart running on port ${APP_CONFIG.ENV.PORT}`);
    });
  } catch (err) {
    console.error("Startup failed:", err);
    process.exit(1);
  }
})();

*/

import express from "express";
import mainApp from "./mainApp.js";
import adminApp from "./adminApp.js";
import { APP_CONFIG } from "./config/config.js";

const app = express();

// TEMP: disable vhost for deployment
app.use("/admin", adminApp);
app.use("/", mainApp);

console.log("Views folder:", app.get("views"));

(async () => {
  try {
    await APP_CONFIG.init();
    app.listen(APP_CONFIG.ENV.PORT, () => {
      APP_CONFIG.LOGGER.info(`Nutrismart running on port ${APP_CONFIG.ENV.PORT}`);
    });
  } catch (err) {
    console.error("Startup failed:", err);
    process.exit(1);
  }
})();

