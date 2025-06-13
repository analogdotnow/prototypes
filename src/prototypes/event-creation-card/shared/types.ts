import type { Temporal } from "@js-temporal/polyfill";
import type { EventOutputData } from "../schemas/form";

export type COLORS = "red" | "orange" | "yellow" | "green" | "blue" | "purple";

export interface Account {
  email: string;
  color: COLORS;
}

export interface StoredEvent
  extends Omit<
    EventOutputData,
    | "repeats"
    | "repeatType"
    | "startDate"
    | "endDate"
    | "timezone"
    | "startTime"
    | "endTime"
  > {
  id: string;
  startTime: Temporal.ZonedDateTime;
  endTime: Temporal.ZonedDateTime;
  rrule?: string;
  createdAt: string;
  updatedAt: string;
}
