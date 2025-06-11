import { Temporal } from "@js-temporal/polyfill";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import type { StoredEvent } from "../shared/types";

const storage = createJSONStorage<StoredEvent[]>(() => localStorage, {
  reviver: (key, value) => {
    if (key === "startTime" || key === "endTime") {
      if (typeof value === "string" && value.includes("[")) {
        try {
          return Temporal.ZonedDateTime.from(value);
        } catch {
          return value;
        }
      }
    }
    return value;
  },
  replacer: (key, value) => {
    if (key === "startTime" || key === "endTime") {
      if (value && typeof value === "object" && "toJSON" in value) {
        return (value as { toJSON(): string }).toJSON();
      }
    }
    return value;
  },
});

export const eventsAtom = atomWithStorage<StoredEvent[]>(
  "analog-events",
  [],
  storage,
);
