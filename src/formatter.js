// @flow

import type { LogMessage } from "./logless";

const stringify = require("json-stringify-safe");

module.exports = (
  level: "silly" | "debug" | "verbose" | "info" | "warn" | "error",
  input: LogMessage,
  meta: { requestId: string }
): string => {
  if (typeof input === "string") {
    return stringify({
      level,
      message: input,
      meta
    });
  }

  if (input instanceof Error) {
    return stringify({
      level,
      message: input.message,
      stack: input.stack,
      meta
    });
  }

  return stringify({
    level,
    message: input.message,
    data: input.data,
    error: input.error && {
      message: input.error.message,
      stack: input.error.stack
    },
    meta
  });
};
