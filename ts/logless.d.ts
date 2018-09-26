declare const logless: (config: any, requestId?: string) => Logger;

export default logless;

export type LogMessage =
  | string
  | Error
  | { message: string; data?: {}; error?: Error };

export type Logger = {
  silly: (message: LogMessage) => void;
  debug: (message: LogMessage) => void;
  verbose: (message: LogMessage) => void;
  info: (message: LogMessage) => void;
  warn: (message: LogMessage) => void;
  error: (message: LogMessage) => void;
};

export type Config = {
  logLevel: string;
  logFn?: (msg: string) => void;
};
