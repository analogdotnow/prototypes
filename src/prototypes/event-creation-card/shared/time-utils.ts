import {
  parseDate,
  parseTime,
  toCalendarDateTime,
  toZoned,
} from "@internationalized/date";
import { Temporal } from "@js-temporal/polyfill";
import type { EventFormData } from "../schemas/event-form-schema";

type DateFields = Pick<
  EventFormData,
  "startDate" | "endDate" | "startTime" | "endTime" | "timezone"
>;

type StringDateFields = {
  date: string;
  time: string | null;
  timezone: string;
};

export function getZonedEventTimes(data: DateFields) {
  try {
    return {
      startTime: getTemporalZonedDateTime({
        date: data.startDate,
        time: data.startTime,
        timezone: data.timezone,
      }),
      endTime: getTemporalZonedDateTime({
        date: data.endDate,
        time: data.endTime,
        timezone: data.timezone,
      }),
    };
  } catch (error) {
    console.error("Error getting zoned event dates:", error);
    return {
      startTime: null,
      endTime: null,
    };
  }
}

export function getTemporalZonedDateTime(
  strings: StringDateFields,
): Temporal.ZonedDateTime {
  const { date, time, timezone } = strings;
  const parsedDate = parseDate(date);
  const parsedTime = time ? parseTime(time) : undefined;

  const dateTime = toCalendarDateTime(parsedDate, parsedTime);
  const zoned = toZoned(dateTime, timezone);

  return Temporal.ZonedDateTime.from({
    year: zoned.year,
    month: zoned.month,
    day: zoned.day,
    hour: zoned.hour,
    minute: zoned.minute,
    timeZone: zoned.timeZone,
  });
}

const timeFormatter = new Intl.DateTimeFormat("default", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export function getFormattedTime(time: Temporal.ZonedDateTime): string {
  return timeFormatter.format(time.toInstant().epochMilliseconds);
}

export function ensureThreeDays<T>(grouped: Record<string, T[]>) {
  while (Object.keys(grouped).length < 3) {
    const existingDates = Object.keys(grouped).sort();
    const baseDate =
      existingDates.length > 0
        ? Temporal.PlainDate.from(existingDates[existingDates.length - 1])
        : Temporal.Now.plainDateISO();
    const dateToAdd = baseDate.add({ days: 1 });
    grouped[dateToAdd.toString()] = [];
  }
  return grouped;
}
