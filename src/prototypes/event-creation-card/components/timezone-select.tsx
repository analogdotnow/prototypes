import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useId, useMemo, useState } from "react";

const timezones = Intl.supportedValuesOf("timeZone");

const formattedTimezones = timezones
  .map((timezone) => {
    const formatter = new Intl.DateTimeFormat("en", {
      timeZone: timezone,
      timeZoneName: "shortOffset",
    });
    const parts = formatter.formatToParts(new Date());
    const offset =
      parts.find((part) => part.type === "timeZoneName")?.value || "";
    const modifiedOffset = offset === "GMT" ? "GMT+0" : offset;

    return {
      value: timezone,
      label: `(${modifiedOffset}) ${timezone.replace(/_/g, " ")}`,
      numericOffset: Number.parseInt(
        offset.replace("GMT", "").replace("+", "") || "0",
      ),
    };
  })
  .sort((a, b) => a.numericOffset - b.numericOffset);

const getShortOffset = (value: string) => {
  return formattedTimezones
    .find((timezone) => timezone.value === value)
    ?.label.split("(")[1]
    .split(")")[0];
};

type TimezoneSelectProps = {
  className?: string;
  value: string;
  onChange: (value: string) => void;
};

export function TimezoneSelect({
  className,
  value,
  onChange,
}: TimezoneSelectProps) {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);
  const triggerText = value ? getShortOffset(value) : "Timezone";

  const sortedTimezones = useMemo(() => {
    if (value) {
      return [
        ...formattedTimezones.filter((timezone) => timezone.value === value),
        ...formattedTimezones.filter((timezone) => timezone.value !== value),
      ];
    }
    return formattedTimezones;
  }, [value]);

  return (
    <div className="flex flex-1">
      <Label htmlFor={id} className="sr-only">
        Select a timezone
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "bg-background/40 hover:bg-accent border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px] select-none",
              className,
            )}
          >
            <span className={cn("truncate", !value && "text-muted-foreground")}>
              {triggerText}
            </span>
            <ChevronDownIcon
              size={16}
              className="text-muted-foreground/80 shrink-0"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="border-input w-72 min-w-[var(--radix-popper-anchor-width)] p-0"
          align="end"
          side="bottom"
        >
          <Command
            filter={(value, search) => {
              const normalizedValue = value.toLowerCase();
              const normalizedSearch = search.toLowerCase().replace(/\s+/g, "");
              return normalizedValue.includes(normalizedSearch) ? 1 : 0;
            }}
          >
            <CommandInput
              placeholder="Search timezone..."
              className="text-xs h-8 p-0"
              wrapperClassName="[&_svg]:size-4 px-4"
            />
            <CommandList className="max-h-32">
              <CommandEmpty>No timezone found.</CommandEmpty>
              <CommandGroup className="py-1">
                {sortedTimezones.map(({ value: itemValue, label }) => (
                  <CommandItem
                    key={itemValue}
                    value={itemValue}
                    onSelect={(currentValue) => {
                      if (currentValue !== value) {
                        onChange(currentValue);
                        setOpen(false);
                      }
                    }}
                    className="text-xs [&_svg]:size-3.5"
                  >
                    {label}
                    {value === itemValue && (
                      <CheckIcon size={16} className="ml-auto" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
