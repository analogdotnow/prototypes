import type { Temporal } from "@js-temporal/polyfill";
import type { EventFormData } from "~/event-creation-card/schemas/event-form-schema";

export type COLORS = "red" | "orange" | "yellow" | "green" | "blue" | "purple";

export interface Account {
  email: string;
  color: COLORS;
}

export interface StoredEvent
  extends Omit<
    EventFormData,
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
