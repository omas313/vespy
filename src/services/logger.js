import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

const init = () => {
  Sentry.init({
    dsn: "https://3cd43f506ed04e01b11b4b59dcba102f@o184093.ingest.sentry.io/6051277",
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
};

const log = error => {
  Sentry.captureException(error);
};

const logger = {
  init,
  log,
};

export default logger;
