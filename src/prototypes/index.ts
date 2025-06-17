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
    id: "settings-dialog",
    name: "Settings dialog",
    description:
      "Global settings for the app. Includes view preferences, account management and etc.",
    component: lazy(() => import("./settings-dialog/main")),
    mobileDisabled: true,
  },
  {
    id: "example",
    name: "New example",
    description: "This is an example prototype.",
    component: lazy(() => import("./example/main")),
  },
];
