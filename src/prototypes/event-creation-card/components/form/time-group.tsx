import { Button } from "@/components/ui/button";
import { DateInput, TimeField } from "@/components/ui/datefield-rac";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  type Time,
  getLocalTimeZone,
  now,
  parseTime,
  toTime,
} from "@internationalized/date";
import { useField, useStore } from "@tanstack/react-form";
import { ArrowRight, Clock } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback } from "react";
import { Label as AriaLabel, type TimeFieldProps } from "react-aria-components";
import { TimezoneSelect } from "~/event-creation-card/components/timezone-select";
import { withForm } from "~/event-creation-card/hooks/form";
import { defaultFormOptions } from "~/event-creation-card/shared/form-defaults";

const safeParseTime = (time: string | null) => {
  if (!time) return null;
  try {
    return parseTime(time);
  } catch (error) {
    return null;
  }
};

const TimeGroup = withForm({
  ...defaultFormOptions,
  render: ({ form }) => {
    const isAllDay = useStore(form.store, (state) => state.values.isAllDay);
    const startField = useField({ name: "startTime", form });
    const endField = useField({ name: "endTime", form });

    const getDurationChangeHandler = useCallback(
      (minutes: number) => () => {
        let start = safeParseTime(startField.state.value);
        if (!start) {
          const nowTime = now(getLocalTimeZone()).set({
            second: 0,
            millisecond: 0,
          });
          start = toTime(nowTime);
          startField.handleChange(start.toString());
        }
        const end = start.add({ minutes });
        endField.handleChange(end.toString());
      },
      [startField.state.value, startField.handleChange, endField.handleChange],
    );

    return (
      <AnimatePresence initial={false}>
        {!isAllDay && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "fit-content" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="overflow-hidden"
            layout
          >
            <section className="pl-3.5 pr-4 flex flex-col gap-y-3 pb-2">
              <div className="grid grid-cols-[1fr_auto_1fr] pl-0.5">
                <div className="flex items-center">
                  <Clock
                    className="size-4 text-muted-foreground/80 hover:text-foreground"
                    aria-hidden="true"
                  />
                  <StyledTimeField
                    label="Start Time"
                    className="flex-1 pr-7"
                    inputClassName="justify-end"
                    value={safeParseTime(startField.state.value)}
                    onChange={(value) =>
                      value && startField.handleChange(value.toString())
                    }
                  />
                </div>
                <ArrowRight className="size-4 text-muted-foreground/80 self-center" />
                <StyledTimeField
                  label="End Time"
                  className="flex-1 pl-7"
                  value={safeParseTime(endField.state.value)}
                  onChange={(value) =>
                    value && endField.handleChange(value.toString())
                  }
                />
              </div>
              <ActionsRow durationChangeHandler={getDurationChangeHandler}>
                <form.Field name="timezone">
                  {(field) => (
                    <TimezoneSelect
                      className="px-2 text-xs h-5 gap-0 shadow-none"
                      value={field.state.value}
                      onChange={(value) => field.handleChange(value)}
                    />
                  )}
                </form.Field>
              </ActionsRow>
            </section>
            <Separator className="bg-muted-foreground/10" />
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
});

function ActionsRow({
  children,
  durationChangeHandler,
}: {
  children: React.ReactNode;
  durationChangeHandler: (minutes: number) => () => void;
}) {
  return (
    <div className="flex gap-x-1">
      <ActionTag onClick={durationChangeHandler(15)}>15 m</ActionTag>
      <ActionTag onClick={durationChangeHandler(30)}>30 m</ActionTag>
      <ActionTag onClick={durationChangeHandler(60)}>1 h</ActionTag>
      <ActionTag onClick={durationChangeHandler(120)}>2 h</ActionTag>
      {children}
    </div>
  );
}

function ActionTag({
  children,
  ...props
}: { children: React.ReactNode } & React.ComponentProps<typeof Button>) {
  return (
    <Button
      type="button"
      variant="ghost"
      className="relative h-5 bg-background/40 border border-input rounded-md font-medium text-xs px-2 min-w-11"
      {...props}
    >
      {children}
    </Button>
  );
}

function StyledTimeField({
  label,
  inputClassName,
  ...props
}: {
  label: string;
  inputClassName?: string;
} & TimeFieldProps<Time>) {
  return (
    <TimeField {...props}>
      <AriaLabel className="sr-only" htmlFor={props.name}>
        {label}
      </AriaLabel>
      <DateInput
        className={cn(
          "w-full inline-flex items-center bg-transparent border-none shadow-none h-6 text-md data-focus-within:ring-0",
          inputClassName,
        )}
        segmentClassName="data-focused:bg-blue-100 data-focused:text-blue-800 dark:data-focused:bg-blue-300/10 dark:data-focused:text-blue-400 px-1"
        unstyled
      />
    </TimeField>
  );
}

export default TimeGroup;
