import { BorderTrail } from "@/components/ui/border-trail";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { type Measures, useUpdateEffect } from "@react-hookz/web";
import { SparklesIcon } from "lucide-react";
import { type MotionProps, motion } from "motion/react";
import { useFieldContext } from "~/event-creation-card/hooks/form-context";
import { useExpandingInput } from "~/event-creation-card/hooks/use-expanding-input";

const TitleField = ({
  cardSize,
  isLoading = false,
  aiEnabled = false,
}: {
  cardSize?: Measures;
  isLoading?: boolean;
  aiEnabled?: boolean;
}) => {
  const field = useFieldContext<string>();
  const { expanded, setFocused, refs } = useExpandingInput(field.state.value);

  const isFormValid = field.form.state.isFormValid;
  const isFieldValid = field.state.meta.isValid;

  const overlayEnabled = expanded || isLoading;
  const expandedTrailEnabled = expanded && isLoading;
  const showAiInputHint =
    aiEnabled && ((isFormValid && !field.state.value) || expanded);

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
        custom={{ expanded, aiEnabled }}
        {...fieldMotionConfig}
      >
        <AiInputHint
          className="absolute right-4"
          {...hintMotionConfig}
          custom={{
            enabled: showAiInputHint,
            expanded,
          }}
        />
        {expandedTrailEnabled && (
          <BorderTrail
            className="bg-radial from-blue-600/80 to-blue-600/0 dark:from-blue-400/70 dark:to-blue-400/0 to-70% bg-transparent"
            size={250}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              duration: 2,
            }}
          />
        )}
        {expanded ? (
          <Textarea
            ref={refs.textarea}
            id={field.name}
            placeholder="Event name or prompt..."
            disabled={isLoading}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={() => !isLoading && setFocused(false)}
            className="relative px-4 pt-0.5 text-lg leading-tight scrollbar-hidden field-sizing-content max-h-40 h-full min-h-0 resize-none shadow-none border-none bg-transparent focus:outline-hidden focus-visible:ring-0"
          />
        ) : (
          <Input
            ref={refs.input}
            id={field.name}
            type="text"
            placeholder="Event name or prompt..."
            disabled={isLoading}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            aria-invalid={!isFieldValid}
            onFocus={() => setFocused(true)}
            className={cn(
              "w-full pl-4 pr-12 py-0 h-auto leading-tight shadow-none text-lg border-none bg-transparent focus:outline-hidden focus-visible:ring-0 aria-invalid:text-destructive aria-invalid:placeholder:text-destructive/50",
              isFormValid && "pr-4",
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

function AiInputHint({
  className,
  ...props
}: { className?: string } & React.ComponentProps<typeof motion.div>) {
  return (
    <motion.div
      className={cn(
        "flex items-center gap-2 pt-[0.1rem] select-none",
        className,
      )}
      {...props}
    >
      <kbd className="bg-transparent text-muted-foreground/70 ms-1 -me-1 inline-flex h-5 max-h-full items-center rounded-md border px-1.5 font-[inherit] text-[0.8rem] font-medium">
        ⌘↵
      </kbd>
      <SparklesIcon className="size-3.5 text-muted-foreground/70" />
    </motion.div>
  );
}

const fieldMotionConfig: MotionProps = {
  variants: {
    base: {
      y: 0,
      scale: 1,
      height: "100%",
      paddingTop: "0.25rem",
    },
    main: ({ expanded, aiEnabled }) => ({
      y: expanded ? "2.5rem" : 0,
      scale: expanded ? 1.05 : 1,
      height: expanded ? "400%" : "100%",
      paddingTop: expanded ? "1rem" : "0.25rem",
      paddingBottom: expanded && aiEnabled ? "2rem" : "0.5rem",
    }),
  },
  initial: "base",
  animate: "main",
  transition: {
    type: "spring",
    stiffness: 200,
    damping: 30,
  },
};

const hintMotionConfig: MotionProps = {
  variants: {
    base: {
      opacity: 0,
      top: "50%",
      y: "-50%",
      visibility: "hidden",
    },
    main: ({ enabled, expanded }) => ({
      opacity: enabled ? 1 : 0,
      visibility: enabled ? "visible" : "hidden",
      top: expanded ? "100%" : "50%",
      y: expanded ? "-140%" : "-50%",
    }),
  },
  initial: "base",
  animate: "main",
  transition: {
    ease: "easeInOut",
    duration: 0.2,
  },
};

export default TitleField;
