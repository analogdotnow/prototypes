import type { PrototypeEntry } from "@/types";
import { lazy } from "react";

export const prototypes: PrototypeEntry[] = [
  {
    id: "event-creation-card",
    name: "Event creation card",
    description:
      "This card has all the fields needed to create an event, AI input is supported.",
    component: lazy(() => import("./event-creation-card/main")),
    settings: lazy(() => import("./event-creation-card/settings")),
  },
  {
    id: "example",
    name: "New example",
    description: "This is an example prototype.",
    component: lazy(() => import("./example/main")),
  },
];
