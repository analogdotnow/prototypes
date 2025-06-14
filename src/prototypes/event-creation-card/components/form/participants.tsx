import { AsyncSelect } from "@/components/ui/async-select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useUpdateEffect } from "@react-hookz/web";
import { Users } from "lucide-react";
import { useState } from "react";
import { withForm } from "~/event-creation-card/hooks/form";
import type { Participant } from "~/event-creation-card/schemas/participants";
import { defaultFormOptions } from "~/event-creation-card/shared/form-defaults";
import {
  type User,
  getUsersFromParticipants,
  searchUsers,
} from "~/event-creation-card/shared/users";

const ParticipantsField = withForm({
  ...defaultFormOptions,
  render: ({ form }) => {
    return (
      <form.Field name="selectedParticipants">
        {(field) => (
          <Participants
            value={field.state.value}
            onChange={field.handleChange}
            isInvalid={field.state.meta.isValid === false}
          />
        )}
      </form.Field>
    );
  },
});

interface ParticipantsFieldProps {
  value: Participant[];
  onChange: (value: Participant[]) => void;
  isInvalid?: boolean;
}

const Participants = ({
  value,
  onChange,
  isInvalid,
}: ParticipantsFieldProps) => {
  const [participants, setParticipants] = useState<User[]>(
    getUsersFromParticipants(value),
  );

  const handleChange = (participants: User[]) => {
    setParticipants(participants);
    onChange(participants);
  };

  useUpdateEffect(() => {
    if (value.length === 0) {
      setParticipants([]);
    }
  }, [value]);

  return (
    <div className="flex gap-x-3 px-4 items-center">
      <Users className="text-muted-foreground/80 size-4" />
      <div className="flex-1">
        <AsyncSelect<User>
          label="Users"
          placeholder="No participants"
          searchPlaceholder="Search users or type an email..."
          noResultsMessage="No users found"
          triggerClassName="shadow-none border-none bg-transparent hover:bg-transparent h-6 p-0.5 aria-invalid:text-destructive"
          getDisplayValue={SelectedParticipants}
          renderOption={ParticipantOption}
          getOptionValue={(user) => user.id}
          value={participants}
          onChange={handleChange}
          fetcher={searchUsers}
          isInvalid={isInvalid}
          multiple
        />
      </div>
    </div>
  );
};

function ParticipantOption(user: User) {
  const primaryText = user.name ?? user.email;
  const secondaryText = user.name ? user.email : undefined;
  const defaultInitials = primaryText.charAt(0).toUpperCase();
  const initials = user.initials ?? defaultInitials;

  return (
    <div className="flex items-center gap-3 px-2">
      <Avatar className="size-6">
        <AvatarImage src={user.avatarUrl} alt={`${user.name} avatar`} />
        <AvatarFallback
          className={cn(
            "bg-ring/40 text-[0.7rem]",
            initials.length === 1 && "text-sm",
          )}
        >
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <div
          className={cn(
            "font-medium text-sm leading-loose",
            secondaryText && "leading-none",
          )}
        >
          {primaryText}
        </div>
        {secondaryText && (
          <div className="text-xs text-muted-foreground leading-tight">
            {secondaryText}
          </div>
        )}
      </div>
    </div>
  );
}

function SelectedParticipants(participants: User[]) {
  if (participants.length === 0) return null;

  const sorted = [...participants].sort((a, b) => {
    if (a.name && b.name) {
      return a.name.length - b.name.length;
    }
    return a.email.length - b.email.length;
  });
  const displayText = sorted
    .slice(0, 2)
    .map((p) => p.name ?? p.email)
    .join(", ");

  return (
    <span className="font-medium text-sm inline-flex items-center">
      <span className="truncate max-w-48">{displayText}</span>
      {sorted.length > 2 && (
        <span className="rounded-full px-2 py-0.5 bg-muted-foreground/10 text-xs font-mono font-normal ml-2">
          +{sorted.length - 2}
        </span>
      )}
    </span>
  );
}

export default ParticipantsField;
