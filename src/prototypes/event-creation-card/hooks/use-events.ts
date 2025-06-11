import { parseDate } from "@internationalized/date";
import { useAtom } from "jotai";
import { useCallback } from "react";
import type { EventFormData } from "../schemas/event-form-schema";
import { generateRRule } from "../shared/rrule-utils";
import { getZonedEventTimes } from "../shared/time-utils";
import type { StoredEvent } from "../shared/types";
import { eventsAtom } from "../store/events";

export function useEvents() {
  const [events, setEvents] = useAtom(eventsAtom);

  const addEvent = useCallback(
    (eventInput: EventFormData): StoredEvent | undefined => {
      const now = new Date().toISOString();
      const id = crypto.randomUUID();

      const { repeatType, endDate } = eventInput;
      const endDateObj = parseDate(endDate);
      const { startTime, endTime } = getZonedEventTimes(eventInput);
      if (!startTime || !endTime) {
        return;
      }
      const endDateUTC = endTime.withTimeZone("UTC").with({
        year: endDateObj.year,
        month: endDateObj.month,
        day: endDateObj.day,
      });

      const recurrenceRule = repeatType
        ? generateRRule({
            repeatType: repeatType,
            eventDates: { startDate: startTime, endDate: endDateUTC },
            timezone: eventInput.timezone,
          })
        : "";

      const partialNewEvent = {
        id,
        startTime,
        endTime,
        rrule: recurrenceRule,
        createdAt: now,
        updatedAt: now,
      };
      const newEvent = {
        ...eventInput,
        ...partialNewEvent,
      };
      setEvents((prev) => [...prev, newEvent]);
      return newEvent;
    },
    [setEvents],
  );

  const deleteEvent = useCallback(
    (eventId: string): boolean => {
      let wasDeleted = false;

      setEvents((prev) => {
        const filtered = prev.filter((event) => {
          if (event.id === eventId) {
            wasDeleted = true;
            return false;
          }
          return true;
        });
        return filtered;
      });

      return wasDeleted;
    },
    [setEvents],
  );

  const getEventById = useCallback(
    (eventId: string): StoredEvent | undefined => {
      return events.find((event) => event.id === eventId);
    },
    [events],
  );

  const clearAllEvents = useCallback(() => {
    setEvents([]);
  }, [setEvents]);

  return {
    events,
    eventsCount: events.length,
    addEvent,
    deleteEvent,
    getEventById,
    clearAllEvents,
  };
}
