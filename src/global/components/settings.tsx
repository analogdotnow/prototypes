import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Cog, Smile } from "lucide-react";
import { Button } from "./ui/button";

export default function PrototypeSettings({
  children,
}: { children?: React.ReactNode }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Settings">
          <Cog className="size-4" aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-3 min-h-32" align="start" side="bottom">
        {children || <SettingsPlaceholder />}
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
