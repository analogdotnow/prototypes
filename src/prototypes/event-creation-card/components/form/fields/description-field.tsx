import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";
import { MessageSquare } from "lucide-react";
import { useId } from "react";
import { useFieldContext } from "~/event-creation-card/hooks/form-context";

const DescriptionField = ({ maxLength = 200 }: { maxLength?: number }) => {
  const id = useId();
  const field = useFieldContext<string>();
  const textareaRef = useAutoResizeTextarea(120);

  return (
    <div className="flex gap-x-3 px-4">
      <MessageSquare className="text-muted-foreground/80 size-4 shrink-0 mt-1" />
      <Label htmlFor={id} className="hidden">
        Event description
      </Label>
      <Textarea
        ref={textareaRef}
        id={id}
        placeholder="Add description..."
        value={field.state.value ?? ""}
        maxLength={maxLength}
        rows={1}
        onChange={(e) => field.handleChange(e.target.value)}
        className="field-sizing-content scrollbar-hidden max-h-29.5 min-h-0 resize-none rounded-none border-none shadow-none focus-visible:ring-0 p-0.5"
      />
    </div>
  );
};

export default DescriptionField;
