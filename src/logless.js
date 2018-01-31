// @flow
/* eslint-disable no-console */

const formatMessage = require("./formatter");

export type LogMessage =
  | string
  | Error
  | { message: string, data?: mixed, error?: Error };

export type Logger = {
  silly: (message: LogMessage) => void,
  debug: (message: LogMessage) => void,
  verbose: (message: LogMessage) => void,
  info: (message: LogMessage) => void,
  warn: (message: LogMessage) => void,
  error: (message: LogMessage) => void
};

export type Config = {
  logLevel: string,
  logFn?: (msg: string) => void
};

const logLevels = {
  silly: 6,
  debug: 5,
  verbose: 4,
  info: 3,
  warn: 2,
  error: 1
};

const getLogLevelNumber = (logLevel: string): number => {
  const logLevelStrings = (logLevels: { [string]: ?number });
  const logLevelNumber = logLevelStrings[logLevel];

  if (typeof logLevelNumber === "number") {
    return logLevelNumber;
  }

  return Number.NEGATIVE_INFINITY;
};
module.exports = (
  { logLevel, logFn = console.log }: Config,
  requestId: string = "N/A"
): Logger => {
  const logLevelNumber = getLogLevelNumber(logLevel);

  if (logLevelNumber < 0) {
    logFn(
      formatMessage(
        "error",
        `LoggerError: Unable to log at level '${logLevel}'`,
        { requestId }
      )
    );
  }

  return {
    silly(message) {
      if (logLevelNumber >= logLevels.silly) {
        logFn(formatMessage("silly", message, { requestId }));
      }
    },
    debug(message) {
      if (logLevelNumber >= logLevels.debug) {
        logFn(formatMessage("debug", message, { requestId }));
      }
    },
    verbose(message) {
      if (logLevelNumber >= logLevels.verbose) {
        logFn(formatMessage("verbose", message, { requestId }));
      }
    },
    info(message) {
      if (logLevelNumber >= logLevels.info) {
        logFn(formatMessage("info", message, { requestId }));
      }
    },
    warn(message) {
      if (logLevelNumber >= logLevels.warn) {
        logFn(formatMessage("warn", message, { requestId }));
      }
    },
    error(message) {
      if (logLevelNumber >= logLevels.error) {
        logFn(formatMessage("error", message, { requestId }));
      }
    }
  };
};
