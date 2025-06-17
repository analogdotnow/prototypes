import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useId, useState } from "react";
import DarkTheme from "../assets/dark.svg?react";
import LightTheme from "../assets/light.svg?react";
import SystemTheme from "../assets/system.svg?react";

const themes = {
  system: {
    name: "System",
    icon: SystemTheme,
  },
  light: {
    name: "Light",
    icon: LightTheme,
  },
  dark: {
    name: "Dark",
    icon: DarkTheme,
  },
};

export default function General() {
  const [value, setValue] = useState<string>("system");
  const [startOfWeek, setStartOfWeek] = useState<string>("monday");
  const [dateFormat, setDateFormat] = useState<string>("dd-mmm-yyyy");
  const [timeFormat, setTimeFormat] = useState<string>("24h");

  const startOfWeekId = useId();
  const dateFormatId = useId();
  const timeFormatId = useId();

  return (
    <div className="flex flex-col gap-6">
      <section className="space-y-5">
        <div className="flex flex-col gap-0.5">
          <p className="text-md font-light">Theme</p>
          <p className="text-sm text-muted-foreground">
            Select a theme to customize the look of your calendar
          </p>
        </div>
        <ToggleGroup
          type="single"
          variant="outline"
          className="gap-x-4 data-[variant=outline]:shadow-none"
          value={value}
          onValueChange={(value: string) => {
            if (value) setValue(value);
          }}
        >
          {Object.entries(themes).map(([key, value]) => (
            <ToggleGroupItem
              className="flex-1 h-fit border-none group/theme px-0 hover:bg-transparent data-[state=on]:bg-transparent"
              value={key}
              key={key}
            >
              <div className="relative w-full">
                <value.icon className="size-auto rounded-md ring-offset-popover group-aria-checked/theme:ring-offset-4 group-aria-checked/theme:ring-2 group-aria-checked/theme:ring-ring/40 dark:group-aria-checked/theme:ring-ring" />
                <p className="mt-3 text-sm font-light text-muted-foreground group-aria-checked/theme:text-foreground">
                  {value.name}
                </p>
              </div>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </section>

      <section className="space-y-4">
        <p className="text-md font-light">Locale and format</p>
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-sm font-light text-foreground/80 mb-1">
              Start of week
            </h3>
            <p className="text-xs text-muted-foreground text-pretty">
              Which day should be shown as the first day of the week.
            </p>
          </div>
          <div className="w-48">
            <Label htmlFor={startOfWeekId} className="sr-only">
              Start of week
            </Label>
            <Select value={startOfWeek} onValueChange={setStartOfWeek}>
              <SelectTrigger id={startOfWeekId}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sunday">Sunday</SelectItem>
                <SelectItem value="monday">Monday</SelectItem>
                <SelectItem value="tuesday">Tuesday</SelectItem>
                <SelectItem value="wednesday">Wednesday</SelectItem>
                <SelectItem value="thursday">Thursday</SelectItem>
                <SelectItem value="friday">Friday</SelectItem>
                <SelectItem value="saturday">Saturday</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-sm font-light text-foreground/80 mb-1">
              Date format
            </h3>
            <p className="text-xs text-muted-foreground text-pretty">
              Which format used to display a date.
            </p>
          </div>
          <div className="w-48">
            <Label htmlFor={dateFormatId} className="sr-only">
              Date format
            </Label>
            <Select value={dateFormat} onValueChange={setDateFormat}>
              <SelectTrigger id={dateFormatId}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dd-mmm-yyyy">16 Nov 2023</SelectItem>
                <SelectItem value="dd/mm/yyyy">16/11/2023</SelectItem>
                <SelectItem value="mm/dd/yyyy">11/16/2023</SelectItem>
                <SelectItem value="yyyy-mm-dd">2023-11-16</SelectItem>
                <SelectItem value="mmm-dd-yyyy">Nov 16, 2023</SelectItem>
                <SelectItem value="dd-mm-yyyy">16-11-2023</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-sm font-light text-foreground/80 mb-1">
              Time format
            </h3>
            <p className="text-xs text-muted-foreground text-pretty">
              Which format used to display a time.
            </p>
          </div>
          <div className="w-48">
            <Label htmlFor={timeFormatId} className="sr-only">
              Time format
            </Label>
            <Select value={timeFormat} onValueChange={setTimeFormat}>
              <SelectTrigger id={timeFormatId}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">16:30</SelectItem>
                <SelectItem value="12h">4:30 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>
    </div>
  );
}
