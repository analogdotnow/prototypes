import { BorderTrail } from "@/components/ui/border-trail";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { type Measures, useUpdateEffect } from "@react-hookz/web";
import { motion } from "motion/react";
import { useFieldContext } from "~/event-creation-card/hooks/form-context";
import { useExpandingInput } from "~/event-creation-card/hooks/use-expanding-input";

const TitleField = ({
  cardSize,
  isLoading = false,
}: {
  cardSize?: Measures;
  isLoading?: boolean;
}) => {
  const field = useFieldContext<string>();
  const { expanded, setFocused, refs } = useExpandingInput(field.state.value);

  const overlayEnabled = expanded || isLoading;
  const expandedTrailEnabled = expanded && isLoading;

  useUpdateEffect(() => {
    if (!isLoading) {
      setFocused(false);
    }
  }, [isLoading]);

  return (
    <div className="mb-2 h-9 w-full relative">
      <Label className="sr-only" htmlFor={field.name}>
        Event name
      </Label>
      <motion.div
        className={cn(
          "absolute rounded-2xl w-full bg-muted/0 transition-colors duration-300 z-30",
          expanded && "bg-analog-neutral/90 dark:bg-muted/95 z-[100]",
        )}
        animate={{
          y: expanded ? "2.75rem" : 0,
          scale: expanded ? 1.05 : 1,
          height: expanded ? "400%" : "100%",
          paddingTop: expanded ? "1rem" : "0.25rem",
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 30,
        }}
      >
        <BorderTrail
          className={cn(
            "bg-radial from-blue-600/80 to-blue-600/0 dark:from-blue-400/70 dark:to-blue-400/0 to-70% bg-transparent",
            !expandedTrailEnabled && "opacity-0",
          )}
          size={250}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            duration: 2,
          }}
        />
        {expanded ? (
          <Textarea
            ref={refs.textarea}
            id={field.name}
            placeholder="Event name or prompt..."
            disabled={isLoading}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={() => !isLoading && setFocused(false)}
            className="relative px-4 py-0.5 text-lg leading-tight scrollbar-hidden field-sizing-content max-h-40 h-full min-h-0 resize-none shadow-none border-none bg-transparent focus:outline-hidden focus-visible:ring-0"
          />
        ) : (
          <Input
            ref={refs.input}
            id={field.name}
            type="text"
            placeholder="New event name..."
            disabled={isLoading}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            aria-invalid={field.state.meta.isValid === false}
            onFocus={() => setFocused(true)}
            className={cn(
              "w-full px-4 py-0 h-auto leading-tight shadow-none text-lg border-none bg-transparent focus:outline-hidden focus-visible:ring-0 aria-invalid:text-destructive aria-invalid:placeholder:text-destructive/50",
              !field.form.state.isFormValid && "pr-12",
            )}
          />
        )}
      </motion.div>
      <motion.div
        className={cn(
          "absolute inset-0 translate-y-11 z-20 rounded-lg pointer-events-none transition-colors duration-300 bg-transparent",
          overlayEnabled && "pointer-events-auto bg-background/10",
        )}
        animate={{
          backdropFilter: overlayEnabled ? "blur(2px)" : "blur(0px)",
        }}
        transition={{
          ease: "easeInOut",
          duration: 0.3,
        }}
        style={{
          width: (cardSize?.width || 320) + 2,
          height: (cardSize?.height || 420) + 2,
        }}
      >
        {!expanded && isLoading && (
          <BorderTrail
            className="bg-radial from-blue-600/80 to-blue-600/0 dark:from-blue-500/70 dark:to-blue-500/0 to-70% bg-transparent"
            size={300}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              duration: 3,
            }}
          />
        )}
      </motion.div>
    </div>
  );
};

("");

export default TitleField;
