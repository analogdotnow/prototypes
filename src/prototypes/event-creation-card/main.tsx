import { Separator } from "@/components/ui/separator";
import { Temporal } from "@js-temporal/polyfill";
import { useDeepCompareMemo } from "@react-hookz/web";
import { motion } from "motion/react";
import { Fragment } from "react/jsx-runtime";
import { RRuleTemporal } from "rrule-temporal";
import { CalendarEvent } from "./components/event-card";
import EventForm from "./components/event-form";
import { useEvents } from "./hooks/use-events";
import { ensureThreeDays } from "./shared/time-utils";
import type { StoredEvent } from "./shared/types";

export default function App() {
  const { eventsCount } = useEvents();

  return (
    <div className="flex flex-col md:flex-row gap-14 size-full">
      <div className="md:w-xs shrink-0">
        <EventForm />
      </div>
      <div className="grid grid-cols-1 grid-rows-[2rem_1fr] gap-3 pb-5 flex-1">
        <h2 className="text-xl font-semibold text-foreground self-end select-none">
          Your Events
        </h2>
        <div className="flex flex-col items-center justify-center border border-dashed border-input rounded-lg p-4 overflow-auto">
          {eventsCount === 0 ? (
            <p className="text-muted-foreground select-none">
              No events yet. Create your first event!
            </p>
          ) : (
            <Events />
          )}
        </div>
      </div>
    </div>
  );
}

function Events() {
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
    const result = ensureThreeDays(grouped);
    return Object.entries(result).sort((a, b) =>
      Temporal.PlainDate.compare(a[0], b[0]),
    );
  }, [events]);

  return (
    <motion.div className="flex size-full" layout>
      {eventsByDate.map(([date, events], index) => (
        <Fragment key={date}>
          <div className="flex flex-col gap-3 h-full min-w-80">
            <h3 className="text-lg text-foreground select-none">
              {getColumnHeader(date)}
            </h3>
            {events.sort(sortEventsPredicate).map((event) => (
              <CalendarEvent
                key={event.id}
                className="w-full min-h-16"
                event={event}
              />
            ))}
          </div>
          {index < Object.entries(eventsByDate).length - 1 && (
            <Separator
              orientation="vertical"
              className="h-full bg-transparent bg-[linear-gradient(to_bottom_in_oklab,transparent_0%,var(--border)_15%,var(--border)_85%,transparent_100%)] mx-4"
            />
          )}
        </Fragment>
      ))}
    </motion.div>
  );
}

const getColumnHeader = (date: string) => {
  const dateObj = Temporal.PlainDate.from(date);
  return dateObj.toLocaleString("default", {
    month: "long",
    day: "numeric",
    year:
      dateObj.year === Temporal.Now.plainDateISO().year ? undefined : "numeric",
  });
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
