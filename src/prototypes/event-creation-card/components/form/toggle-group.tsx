import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { RotateCcw, Sun } from "lucide-react";
import { withForm } from "~/event-creation-card/hooks/form";
import { defaultFormOptions } from "~/event-creation-card/shared/form-defaults";

const ToggleGroup = withForm({
  ...defaultFormOptions,
  render: ({ form }) => {
    return (
      <div className="flex relative h-fit border-y border-muted-foreground/10 py-1 px-4">
        <form.Field
          name="isAllDay"
          listeners={{
            onChange: ({ value }) => {
              if (value) {
                form.setFieldValue("startTime", null);
                form.setFieldValue("endTime", null);
              }
            },
          }}
        >
          {(field) => (
            <ToggleWithLabel
              name={field.name}
              label="All day"
              icon={<Sun className="size-4 text-muted-foreground/80" />}
              checked={field.state.value}
              onCheckedChange={field.handleChange}
            />
          )}
        </form.Field>
        <Separator
          orientation="vertical"
          className="data-[orientation=vertical]:h-8 bg-muted-foreground/10"
        />
        <form.Field
          name="repeats"
          listeners={{
            onChange: ({ value, fieldApi }) => {
              if (!value) {
                const startDate = fieldApi.form.getFieldValue("startDate");
                form.setFieldValue("endDate", startDate);
              }
            },
          }}
        >
          {(field) => (
            <ToggleWithLabel
              className="justify-end"
              name={field.name}
              label="Repeat"
              icon={<RotateCcw className="size-4 text-muted-foreground/80" />}
              checked={field.state.value}
              onCheckedChange={field.handleChange}
            />
          )}
        </form.Field>
      </div>
    );
  },
});

function ToggleWithLabel({
  name,
  label,
  className,
  icon,
  checked,
  onCheckedChange,
}: {
  name: string;
  label: string;
  className?: string;
  icon: React.ReactNode;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className={cn("flex-1 flex items-center gap-x-3", className)}>
      {icon}
      <Label htmlFor={name} className="sr-only">
        Toggle {label}
      </Label>
      <Switch
        id={name}
        checked={checked}
        type="button"
        onCheckedChange={onCheckedChange}
        className="data-[state=checked]:bg-blue-400 h-5 [&>span]:size-4 data-[state=checked]:[&>span]:translate-x-5"
      />
      <div className="text-sm text-muted-foreground mr-1">{label}</div>
    </div>
  );
}

export default ToggleGroup;
