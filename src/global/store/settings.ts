import deepmerge from "deepmerge";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type PrototypeSettings = {
  [prototypeId: string]: {
    [variableName: string]: string;
  };
};

const basePrototypeSettingsAtom = atomWithStorage<PrototypeSettings>(
  "prototype-settings",
  {},
);

export const prototypeSettingsAtom = atom(
  (get) => get(basePrototypeSettingsAtom),
  (get, set, update: PrototypeSettings) => {
    const currentSettings = get(basePrototypeSettingsAtom);
    const mergedSettings = deepmerge(currentSettings, update);
    set(basePrototypeSettingsAtom, mergedSettings);
  },
);
