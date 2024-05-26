import { z } from "zod";

const LOG_LEVEL = z
    .enum(["info", "error", "debug", "fatal", "warn"])
    .parse(process.env.LOG_LEVEL);

export { LOG_LEVEL };
