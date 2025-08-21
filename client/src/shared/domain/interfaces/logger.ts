export type LogLevel = "INFO" | "ERROR" | "WARNING" | "DEBUG" | "TRACE";

export const logColors: Record<LogLevel, string> = {
  INFO: "color: #3B82F6; font-weight: bold",
  ERROR: "color: #EF4444; font-weight: bold",
  WARNING: "color: #F59E0B; font-weight: bold",
  DEBUG: "color: #10B981; font-weight: bold",
  TRACE: "color: #8B5CF6; font-weight: bold",
};