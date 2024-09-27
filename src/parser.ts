export interface LogEntry {
  page: string;
  ip: string;
}

/**
 * Parses and returns sanitized data of a file.
 * @param logData string of a log file.
 * @returns {LogEntry[]} An array of objects containing page & ip.
 */
export function parseLogs(logData: string): LogEntry[] {
  const lines = logData.split("\n").filter((line) => line.trim()); //for each line sanitize string
  return lines.map((line) => {
    const [page, ip] = line.split(" "); //split it by whitespace and return log arr
    return { page, ip };
  });
}
