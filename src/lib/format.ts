// Date and price formatting. Sean's List is an SF board, so all dates render
// in Pacific time regardless of server timezone.

import type { Listing } from "./types";

const TIME_ZONE = "America/Los_Angeles";

const fmt = (options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, ...options });

const dayKey = fmt({ year: "numeric", month: "2-digit", day: "2-digit" });
const time = fmt({ hour: "numeric", minute: "2-digit" });
const weekday = fmt({ weekday: "short" });
const monthDay = fmt({ month: "short", day: "numeric" });

const DAY_MS = 24 * 60 * 60 * 1000;

// Short timestamp for listing cards: "9:45 AM" today, "Mon 11:00 AM" this
// week, "Sep 14" before that.
export function formatCardTime(iso: string, now: Date = new Date()): string {
  const date = new Date(iso);
  if (dayKey.format(date) === dayKey.format(now)) return time.format(date);
  if (now.getTime() - date.getTime() < 6 * DAY_MS) {
    return `${weekday.format(date)} ${time.format(date)}`;
  }
  return monthDay.format(date);
}

// "Tue, Sep 22 · 7:30 AM" — posting and comment dates.
export function formatPostedAt(iso: string): string {
  const date = new Date(iso);
  return `${weekday.format(date)}, ${monthDay.format(date)} · ${time.format(date)}`;
}

// "$2,800", "$130-140k", or undefined when the listing has no price.
export function formatPrice(listing: Listing): string | undefined {
  const { price, salaryRange } = listing.metadata;
  if (salaryRange) return salaryRange;
  if (price !== undefined) return `$${price.toLocaleString("en-US")}`;
  return undefined;
}
