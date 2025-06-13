import { prototypeSettingsAtom } from "@/store/settings";
import { useKeyboardEvent, useToggle } from "@react-hookz/web";
import { useAtomValue } from "jotai";
import { useCallback, useMemo, useState } from "react";
import type { AiOutputData } from "../schemas/ai-data";
import { aiInputPredicate, generateEventFormData } from "../shared/ai-input";

export const useAiInput = (getPrompt: () => string) => {
  const [isLoading, toggleLoading] = useToggle(false);
  const [data, setData] = useState<AiOutputData | null>(null);
  const settings = useAtomValue(prototypeSettingsAtom);

  const aiKey = useMemo(() => {
    if (!settings["event-creation-card"]) return null;
    const key = settings["event-creation-card"]?.aiKey;
    return key || null;
  }, [settings]);

  const enabled = aiKey !== null;

  const generateInput = useCallback(
    async (userInput: string) => {
      toggleLoading();
      const generatedInput = await generateEventFormData(
        userInput,
        settings["event-creation-card"]?.aiKey,
      );
      toggleLoading();
      setData(generatedInput);
    },
    [toggleLoading, settings],
  );

  useKeyboardEvent(
    aiInputPredicate,
    () => enabled && generateInput(getPrompt()),
    [getPrompt, generateInput, enabled],
    { eventOptions: { passive: true } },
  );

  return { isLoading, generateInput, data, enabled };
};
