import { Temporal } from "@js-temporal/polyfill";
import { useDeepCompareMemo } from "@react-hookz/web";
import { RRuleTemporal } from "rrule-temporal";
import { ensureThreeDays } from "../shared/time-utils";
import type { StoredEvent } from "../shared/types";
import { useEvents } from "./use-events";

export const useRenderedEvents = () => {
  const { events } = useEvents();

  const eventsByDate = useDeepCompareMemo(() => {
    const withRepeating = addRepeatingEvents(events);
    const grouped = withRepeating.reduce(
      (acc, event) => {
        const date = event.startTime.toPlainDate().toString();
        acc[date] = [...(acc[date] || []), event];
        return acc;
      },
      {} as Record<string, StoredEvent[]>,
    );
    const padded = ensureThreeDays(grouped);
    const result = Object.entries(padded).sort((a, b) =>
      Temporal.PlainDate.compare(a[0], b[0]),
    );
    for (let i = 0; i < result.length; i++) {
      result[i][1].sort(sortEventsPredicate);
    }
    return result;
  }, [events]);

  return { renderedEvents: eventsByDate };
};

const sortEventsPredicate = (a: StoredEvent, b: StoredEvent) => {
  if (a.isAllDay && !b.isAllDay) return -1;
  return Temporal.ZonedDateTime.compare(a.startTime, b.startTime);
};

const addRepeatingEvents = (events: StoredEvent[]): StoredEvent[] => {
  for (const event of events) {
    if (event.rrule) {
      const rule = new RRuleTemporal({
        rruleString: event.rrule,
      });
      const repeatingEvents = [];
      for (const dt of rule.all()) {
        repeatingEvents.push({
          ...event,
          startTime: dt,
          endTime: dt.with({
            hour: event.endTime.hour,
            minute: event.endTime.minute,
          }),
        });
      }
      return events.concat(repeatingEvents.slice(1));
    }
  }
  return events;
};
