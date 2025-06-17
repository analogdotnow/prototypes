import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Cog, Smile } from "lucide-react";
import { useParams } from "react-router";
import { prototypes } from "~/index";
import { Button } from "./ui/button";

export default function PrototypeSettings() {
  const { prototypeId } = useParams<{ prototypeId: string }>();
  const currentPrototype = prototypes.find((p) => p.id === prototypeId);
  const CurrentPrototypeSettings = currentPrototype?.settings;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label="Settings"
          className="dark:bg-transparent md:dark:bg-background md:dark:hover:bg-background/20"
        >
          <Cog className="size-4" aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-3 min-h-32" align="start" side="bottom">
        {CurrentPrototypeSettings ? (
          <CurrentPrototypeSettings />
        ) : (
          <SettingsPlaceholder />
        )}
      </PopoverContent>
    </Popover>
  );
}

function SettingsPlaceholder() {
  return (
    <div className="flex flex-col gap-2 items-center pt-4 pb-6">
      <Smile className="size-10 text-muted-foreground" strokeWidth={1} />
      <p className="text-muted-foreground text-sm max-w-44 text-pretty text-center">
        Add any settings needed for the prototype here
      </p>
    </div>
  );
}
