import AnalogIcon from "@/assets/analog-icon.svg?react";

export default function Notifications() {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex flex-col gap-0.5">
        <p className="text-md font-light">Email notifications</p>
        <p className="text-sm text-muted-foreground">
          Receive email notifications for events you create or attend
        </p>
      </div>
      <div className="flex flex-col items-center gap-4 w-full flex-1 justify-center text-muted-foreground">
        <AnalogIcon
          className="size-14 stroke-muted-foreground text-transparent"
          strokeWidth={6}
          fill="none"
        />
        <p className="text-xl">TODO {":)"}</p>
      </div>
    </div>
  );
}
