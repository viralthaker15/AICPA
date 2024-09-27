import { readFileSync } from "fs";
import path from "path";
import { parseLogs } from "./parser";
import { generateReports } from "./report";

try {
  const logFilePath = path.join(__dirname, "./web.log");

  const logData = readFileSync(logFilePath, "utf-8");
  const parsedLogs = parseLogs(logData);
  const reports = generateReports(parsedLogs);

  console.log(" ---------------- [Total Page Views:] ----------------");
  reports.totalViews.forEach(({ page, views }) => {
    console.log(`${page} --- (${views})`);
  });
  console.log("\n ---------------- [Unique Page Views:] ----------------");
  reports.uniqueViews.forEach(({ page, unique }) => {
    console.log(`${page} --- (${unique})`);
  });
} catch (error) {
  console.error("Error reading log file:", error);
}
