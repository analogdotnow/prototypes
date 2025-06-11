import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import { useFieldContext } from "~/event-creation-card/hooks/form-context";

const LocationField = () => {
  const field = useFieldContext<string>();

  return (
    <div className="flex gap-x-3 items-center px-4">
      <MapPin className="text-muted-foreground/80 size-4 shrink-0" />
      <Label htmlFor="location" className="sr-only">
        Location
      </Label>
      <Input
        id="location"
        type="text"
        placeholder="Add location..."
        className="peer rounded-none border-none shadow-none focus-visible:ring-0 p-0.5 h-6"
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
    </div>
  );
};

export default LocationField;
