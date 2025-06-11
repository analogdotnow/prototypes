import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { type Variants, motion } from "motion/react";
import { useEvents } from "../hooks/use-events";
import { accounts } from "../shared/accounts";
import { getFormattedTime } from "../shared/time-utils";
import type { StoredEvent } from "../shared/types";

interface CalendarEventProps {
  className?: string;
  event: StoredEvent;
}

export function CalendarEvent({ className, event }: CalendarEventProps) {
  const { deleteEvent } = useEvents();
  const variants: Variants = {
    initial: {
      opacity: 0,
      scale: 1.2,
      translateY: "20%",
    },
    normal: {
      opacity: 1,
      translateY: "0%",
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 16,
      },
    },
  };

  const color =
    accounts.find((account) => account.email === event.account)?.color ??
    "blue";

  return (
    <motion.div
      layoutId={event.id}
      variants={variants}
      initial="initial"
      animate="normal"
      className={cn(
        "[border-width:1px] border-calendar-accent",
        "bg-calendar-base hover:bg-calendar-accent",
        "flex pe-2 ps-1 py-1 gap-x-1.5 items-stretch w-full min-h-fit overflow-clip rounded-md transition-colors ease-in-out relative",
        className,
      )}
      style={
        {
          "--calendar-tint": `var(--calendar-${color})`,
        } as React.CSSProperties
      }
      layout="position"
    >
      <div className="shrink-0 bg-[color-mix(in_oklab,var(--foreground),var(--calendar-tint)_90%)] opacity-40 rounded-lg w-1  " />
      <div className="flex flex-col items-start gap-y-1.5">
        <p className="text-sm font-medium leading-none  text-calendar-foreground">
          {event.title}
        </p>
        <p className="text-[12px] leading-none font-medium text-calendar-foreground">
          {getDisplayTime(event)}
        </p>
      </div>
      <Button
        onClick={() => deleteEvent(event.id)}
        variant="ghost"
        size="icon"
        className="absolute bottom-0.5 right-1 text-calendar-foreground hover:bg-calendar-base size-7 hover:text-calendar-foreground"
      >
        <Trash2 className="size-4" />
      </Button>
    </motion.div>
  );
}

function getDisplayTime(event: StoredEvent): string {
  if (event.isAllDay) {
    return "All day";
  }
  return `${getFormattedTime(event.startTime)} - ${getFormattedTime(event.endTime)}`;
}
