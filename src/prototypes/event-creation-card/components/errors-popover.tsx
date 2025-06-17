import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useClickOutside, useMediaQuery, useToggle } from "@react-hookz/web";
import type { StandardSchemaV1Issue } from "@tanstack/react-form";
import { AlertCircleIcon } from "lucide-react";
import { useRef } from "react";

export function ErrorsPopover({
  className,
  errors,
  ...props
}: {
  className?: string;
  errors: Record<string, StandardSchemaV1Issue[]>;
} & React.ComponentProps<typeof TooltipContent>) {
  const [open, toggleOpen] = useToggle(false);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => {
    if (isSmallDevice) toggleOpen(false);
  });

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip open={isSmallDevice ? open : undefined}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-full size-7 bg-transparent text-destructive hover:bg-destructive/10 hover:text-destructive",
              className,
            )}
            onClick={isSmallDevice ? toggleOpen : undefined}
          >
            <AlertCircleIcon className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          className="p-0 overflow-clip min-w-52 max-w-60 border-destructive/30 dark:border-destructive/25"
          ref={ref}
          {...props}
        >
          <div className="bg-destructive/10 dark:bg-destructive/10 px-3 py-2">
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
