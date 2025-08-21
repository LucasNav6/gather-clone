import { logColors, type LogLevel } from "../domain/interfaces/logger";

export class Logger {
  private isProd: boolean;

  constructor() {
    this.isProd = import.meta.env.MODE === "production";
  }

  log(level: LogLevel, ...args: unknown[]) {
    if (this.isProd) return;

    const style = logColors[level];
    console.log(`%c${level}`, style, ...args);
  }

  info(...args: unknown[]) {
    this.log("INFO", ...args);
  }

  error(...args: unknown[]) {
    this.log("ERROR", ...args);
  }

  warn(...args: unknown[]) {
    this.log("WARNING", ...args);
  }

  debug(...args: unknown[]) {
    this.log("DEBUG", ...args);
  }

  trace(...args: unknown[]) {
    this.log("TRACE", ...args);
  }
}

export const logger = new Logger();
