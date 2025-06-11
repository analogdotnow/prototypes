import {
  getLocalTimeZone,
  now,
  toCalendarDate,
  toTime,
} from "@internationalized/date";
import { formOptions } from "@tanstack/react-form";
import {
  type EventFormData,
  eventFormSchemaWithRepeats,
} from "~/event-creation-card/schemas/event-form-schema";
import { accounts } from "./accounts";

const getDefaultFormValues = (): EventFormData => {
  const timezone = getLocalTimeZone();
  const currDate = now(timezone);
  const roundedMinutes = Math.ceil(currDate.minute / 15) * 15;
  const roundedDate =
    roundedMinutes === 60
      ? currDate.add({ hours: 1 }).set({ minute: 0, second: 0, millisecond: 0 })
      : currDate.set({ minute: roundedMinutes, second: 0, millisecond: 0 });

  const startDate = toCalendarDate(roundedDate);
  const startTime = toTime(roundedDate);
  const endTime = startTime.add({ hours: 1 });

  return {
    account: accounts[0].email,
    title: "",
    startTime: startTime.toString(),
    endTime: endTime.toString(),
    startDate: startDate.toString(),
    endDate: startDate.toString(),
    timezone,
    isAllDay: false,
    repeats: false,
    selectedParticipants: [],
  };
};

export const defaultFormOptions = formOptions({
  defaultValues: getDefaultFormValues(),
  validators: {
    onChange: eventFormSchemaWithRepeats,
  },
});
