import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";
import { useId } from "react";
import { useFieldContext } from "~/event-creation-card/hooks/form-context";

const DescriptionField = () => {
  const id = useId();
  const field = useFieldContext<string>();

  return (
    <div className="flex gap-x-3 px-4">
      <MessageSquare className="text-muted-foreground/80 size-4 shrink-0 mt-1" />
      <Label htmlFor={id} className="hidden">
        Event description
      </Label>
      <Textarea
        id={id}
        placeholder="Add description..."
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        className="field-sizing-content max-h-29.5 min-h-0 resize-none rounded-none border-none shadow-none focus-visible:ring-0 p-0.5"
      />
    </div>
  );
};

export default DescriptionField;
