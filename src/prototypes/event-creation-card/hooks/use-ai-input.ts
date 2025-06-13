import { prototypeSettingsAtom } from "@/store/settings";
import { useKeyboardEvent, useToggle } from "@react-hookz/web";
import { useAtom } from "jotai";
import { useCallback, useState } from "react";
import type { AiOutputData } from "../schemas/ai-data";
import { aiInputPredicate, generateEventFormData } from "../shared/ai-input";

export const useAiInput = (getPrompt: () => string) => {
  const [isLoading, toggleLoading] = useToggle(false);
  const [data, setData] = useState<AiOutputData | null>(null);
  const [settings] = useAtom(prototypeSettingsAtom);

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
    () => generateInput(getPrompt()),
    [getPrompt, generateInput],
    { eventOptions: { passive: true } },
  );

  return { isLoading, generateInput, data };
};
