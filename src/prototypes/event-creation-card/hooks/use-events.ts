import { useAtom } from "jotai";
import { useCallback } from "react";
import type { EventOutputData } from "../schemas/form";
import { generateRRule } from "../shared/rrule-utils";
import { getZonedEventTimes } from "../shared/time-utils";
import type { StoredEvent } from "../shared/types";
import { eventsAtom } from "../store/events";

export function useEvents() {
  const [events, setEvents] = useAtom(eventsAtom);

  const addEvent = useCallback(
    (eventInput: EventOutputData): StoredEvent | undefined => {
      const now = new Date().toISOString();
      const id = crypto.randomUUID();

      const { repeatType, endDate } = eventInput;
      const { startTime, endTime } = getZonedEventTimes(eventInput);
      if (!startTime || !endTime) {
        return;
      }
      const endDateUTC = endTime
        .with({
          year: endDate.year,
          month: endDate.month,
          day: endDate.day,
        })
        .withTimeZone("UTC");

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
