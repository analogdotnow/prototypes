import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import {
  useLocalStorageValue,
  useMediaQuery,
  useMountEffect,
} from "@react-hookz/web";
import { MoonIcon, SunIcon } from "lucide-react";
import { useCallback, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle({ className }: { className?: string }) {
  const { value: savedTheme, set: setSavedTheme } =
    useLocalStorageValue<Theme>("theme");
  const [theme, setTheme] = useState<Theme>(!savedTheme ? "light" : savedTheme);
  const userPrefersDark = useMediaQuery("(prefers-color-scheme: dark)");

  const handleThemeChange = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      setSavedTheme(next);
      document.documentElement.classList.toggle("dark", next === "dark");
      return next;
    });
  }, [setSavedTheme]);

  useMountEffect(() => {
    if (userPrefersDark && savedTheme !== "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  });

  return (
    <div className={cn("relative", className)}>
      <Toggle
        variant="outline"
        className="group data-[state=on]:hover:bg-muted size-9 data-[state=on]:bg-background bg-background"
        pressed={theme === "light"}
        onPressedChange={handleThemeChange}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        <MoonIcon
          size={16}
          className="shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
          aria-hidden="true"
        />
        <SunIcon
          size={16}
          className="absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
          aria-hidden="true"
        />
      </Toggle>
    </div>
  );
}
