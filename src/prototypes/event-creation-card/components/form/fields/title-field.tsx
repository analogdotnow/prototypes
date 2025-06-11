import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFieldContext } from "~/event-creation-card/hooks/form-context";

const TitleField = () => {
  const field = useFieldContext<string>();

  return (
    <div className="mb-2">
      <Label className="sr-only" htmlFor={field.name}>
        Event name
      </Label>
      <Input
        id={field.name}
        type="text"
        placeholder="New event name..."
        className="w-full px-4 py-2 mb-2 shadow-none text-lg border-none bg-transparent focus:outline-hidden focus-visible:ring-0"
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
    </div>
  );
};

export default TitleField;
