// src/server.js
import express from "express";
import vhost from "vhost";
import mainApp from "./mainApp.js";
import adminApp from "./adminApp.js";
import { APP_CONFIG } from "./config/config.js";

const app = express();



(async () => {
  try {
    // initialize (connect DB, Redis, verify mailer, setup logger)
    await APP_CONFIG.init();

    // app.use(vhost("localhost", mainApp));
    // app.use(vhost("127.0.0.1", mainApp));
    // app.use(vhost("admin.localhost", adminApp));

    app.use(mainApp);

    console.log("Views folder:", app.get("views"));

    app.listen(APP_CONFIG.ENV.PORT, () => {
      APP_CONFIG.LOGGER.info(`Nutrismart running on port ${APP_CONFIG.ENV.PORT}`);
    });
  } catch (err) {
    console.error("Startup failed:", err);
    process.exit(1);
  }
})();
