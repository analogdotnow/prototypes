import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { StandardSchemaV1Issue } from "@tanstack/react-form";
import { AlertCircleIcon } from "lucide-react";

export function ErrorsPopover({
  className,
  errors,
  ...props
}: {
  className?: string;
  errors: Record<string, StandardSchemaV1Issue[]>;
} & React.ComponentProps<typeof TooltipContent>) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-full size-7 bg-transparent text-destructive hover:bg-destructive/10 hover:text-destructive",
              className,
            )}
          >
            <AlertCircleIcon className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          className="p-0 overflow-clip min-w-52 max-w-60 border-destructive/40 dark:border-destructive/25"
          {...props}
        >
          <div className="bg-destructive/25 dark:bg-destructive/10 px-3 py-2">
            <p className="font-medium mb-1">Errors</p>
            <ul className="list-disc pl-3">
              {Object.entries(errors).map(([, errors]) =>
                errors.map((error) => (
                  <li
                    key={error.message}
                    className="text-destructive-foreground/80 text-[0.8rem] text-pretty"
                  >
                    {error.message}
                  </li>
                )),
              )}
            </ul>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
