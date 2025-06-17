import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { toast as sonnerToast } from "sonner";
import { Button } from "./ui/button";

export function toast(toast: ToastProps) {
  return sonnerToast.custom(
    (id) => (
      <Toast
        id={id}
        title={toast.title}
        description={toast.description}
        icon={toast.icon}
        button={
          toast.button && {
            label: toast.button.label,
            onClick: toast.button.onClick,
          }
        }
        variant={toast.variant}
      />
    ),
    {
      id: toast.id,
      duration: Number.POSITIVE_INFINITY,
      onDismiss: toast.onDismiss,
    },
  );
}

interface ToastProps {
  id: string | number;
  title: string;
  description: string;
  icon?: React.ReactNode;
  button?: {
    label: string;
    onClick: () => void;
  };
  variant?: "default" | "discord" | "destructive";
  onDismiss?: () => void;
}

function Toast(props: ToastProps) {
  const { title, description, icon, button, id, variant } = props;

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row items-end rounded-xl bg-popover shadow-lg border border-border w-fit md:w-full px-4 py-3.5 gap-y-3 md:gap-y-0",
        {
          "md:pl-5": button !== undefined,
          "md:w-lg md:-translate-x-24": variant === "discord",
        },
      )}
    >
      <div className="flex flex-1 items-center pb-[0.1rem]">
        {icon && <div className="mr-4 shrink-0">{icon}</div>}
        <div className="w-full select-none">
          <p className="text-sm font-medium text-foreground leading-none">
            {title}
          </p>
          <p className="mt-1 text-xs text-muted-foreground leading-tight">
            {description}
          </p>
        </div>
      </div>
      {button && (
        <div className="md:ml-2 shrink-0 w-1/2 md:w-auto">
          <Button
            className={cn(
              "rounded-full px-3 pb-1 pt-0.5 h-8 text-sm font-semibold w-full md:w-auto",
              {
                "bg-linear-to-b from-[#5865F2] to-indigo-400 dark:from-indigo-300 dark:to-indigo-400 min-w-20 hover:brightness-90":
                  variant === "discord",
              },
            )}
            variant={variant === "discord" ? "default" : variant}
            onClick={() => {
              button.onClick();
              sonnerToast.dismiss(id);
            }}
          >
            {button.label}
          </Button>
        </div>
      )}
      <Button
        variant="outline"
        size="icon"
        className="size-6 rounded-full absolute -right-2 -top-3"
        onClick={() => sonnerToast.dismiss(id)}
      >
        <X className="size-3.5 text-muted-foreground" />
      </Button>
    </div>
  );
}
