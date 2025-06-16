import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Temporal } from "@js-temporal/polyfill";
import { Calendar } from "lucide-react";
import { motion } from "motion/react";
import { Fragment } from "react/jsx-runtime";
import EventCard from "./components/event-card";
import EventForm from "./components/event-form";
import { useEvents } from "./hooks/use-events";
import { useRenderedEvents } from "./hooks/use-rendered-events";

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
        <ScrollArea className="flex flex-col items-center justify-center border border-dashed border-input rounded-lg p-4">
          {eventsCount === 0 ? (
            <div className="flex flex-col h-full items-center justify-center text-muted-foreground gap-4">
              <Calendar className="size-14" strokeWidth={0.9} />
              <p className="select-none text-xl text-center leading-relaxed">
                No events yet.
                <br />
                Create your first event!
              </p>
            </div>
          ) : (
            <Events />
          )}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}

function Events() {
  const { renderedEvents } = useRenderedEvents();

  return (
    <motion.div className="flex size-full" layout>
      {renderedEvents.map(([date, events], index) => (
        <Fragment key={date}>
          <div className="flex flex-col gap-3 h-full min-w-[16.5rem] 2xl:min-w-80">
            <h3 className="text-lg text-foreground select-none">
              {getColumnHeader(date)}
            </h3>
            {events.map((event) => (
              <EventCard
                key={event.id}
                className="w-full min-h-16"
                event={event}
              />
            ))}
          </div>
          <Separator
            orientation="vertical"
            className={cn(
              "h-full bg-transparent bg-[linear-gradient(to_bottom_in_oklab,transparent_0%,var(--border)_15%,var(--border)_85%,transparent_100%)] mx-4",
              index === renderedEvents.length - 1 && "bg-none",
            )}
          />
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
