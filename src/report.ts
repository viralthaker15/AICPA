import type { LogEntry } from "./parser";

interface PageViews {
  page: string;
  views: number;
}

interface UniqueViews {
  page: string;
  unique: number;
}

interface GeneratedReport {
  totalViews: PageViews[];
  uniqueViews: UniqueViews[];
}

/**
 * Generates reports based on log data.
 * @param logEntries Array of object containing page & ip.
 * @returns {GeneratedReport} An object containing totalViews (Array of PageViews) & uniqueViews (Array of UniqueViews).
 */
export function generateReports(logEntries: LogEntry[]): GeneratedReport {
  const totalViewsMap: { [key: string]: number } = {};
  const uniqueViewsMap: { [key: string]: Set<string> } = {};

  logEntries.forEach(({ page, ip }) => {
    // Increment total views of the page
    totalViewsMap[page] = (totalViewsMap[page] || 0) + 1;

    // add unique IP into Set
    if (!uniqueViewsMap[page]) {
      uniqueViewsMap[page] = new Set<string>();
    }
    uniqueViewsMap[page].add(ip);
  });

  const totalViews: PageViews[] = Object.entries(totalViewsMap)
    .map(([page, views]) => ({ page, views }))
    .sort((a, b) => b.views - a.views); //Desc by views

  const uniqueViews: UniqueViews[] = Object.entries(uniqueViewsMap)
    .map(([page, ips]) => ({ page, unique: ips.size })) // we need ips count, not ips
    .sort((a, b) => b.unique - a.unique); // Desc by unique

  return { totalViews, uniqueViews };
}
