import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Temporal } from "@js-temporal/polyfill";
import { useMediaQuery } from "@react-hookz/web";
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
    <div className="flex flex-col items-center md:items-stretch md:flex-row gap-6 md:gap-14 size-full">
      <div className="w-full max-w-[22rem] md:max-w-xs shrink-0">
        <EventForm />
      </div>
      <div className="grid grid-cols-1 grid-rows-[2rem_1fr] gap-3 max-w-sm md:max-w-none pb-5 md:flex-1 w-full md:w-auto">
        <h2 className="md:text-xl text-lg font-semibold text-foreground self-end select-none">
          Your Events
        </h2>
        <ScrollArea className="border border-dashed border-input rounded-lg size-full p-4">
          {eventsCount === 0 ? (
            <div className="flex flex-col h-full items-center justify-center text-muted-foreground/60 gap-2 md:gap-4 pb-6 md:pt-0 pt-4">
              <Calendar className="md:size-14 size-8" strokeWidth={0.9} />
              <p className="select-none text-sm md:text-xl text-center leading-tight md:leading-snug">
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
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  return (
    <motion.div
      className="flex flex-col md:flex-row w-full md:w-auto md:h-full"
      layout
    >
      {renderedEvents.map(([date, events], index) => (
        <Fragment key={date}>
          <div className="flex flex-col gap-3 md:h-full md:min-w-[16.5rem] 2xl:min-w-80">
            <h3 className="md:text-lg text-md text-foreground select-none">
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
            orientation={isSmallDevice ? "horizontal" : "vertical"}
            className={cn(
              "md:h-full bg-transparent bg-[linear-gradient(to_right_in_oklab,transparent_0%,var(--border)_15%,var(--border)_85%,transparent_100%)] md:bg-[linear-gradient(to_bottom_in_oklab,transparent_0%,var(--border)_15%,var(--border)_85%,transparent_100%)] my-4 md:my-0 md:mx-4",
              index === renderedEvents.length - 1 &&
                "md:bg-none bg-none my-1 md:my-0 md:mx-1",
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
