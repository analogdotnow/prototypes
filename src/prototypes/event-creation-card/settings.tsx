import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { prototypeSettingsAtom } from "@/store/settings";
import { useAtom } from "jotai";
import { KeyRound } from "lucide-react";
import { useCallback } from "react";

export default function Settings() {
  const [settings, setSettings] = useAtom(prototypeSettingsAtom);

  const handleAiKeyChange = useCallback(
    (value: React.ChangeEvent<HTMLInputElement>) => {
      setSettings({
        "event-creation-card": {
          aiKey: value.target.value,
        },
      });
    },
    [setSettings],
  );

  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor="ai-key">OpenAI API key</Label>
      <div className="relative">
        <Input
          id="ai-key"
          className="peer ps-9"
          placeholder="sk-proj-..."
          type="text"
          value={settings["event-creation-card"]?.aiKey || ""}
          onChange={handleAiKeyChange}
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <KeyRound size={16} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
