import { AsyncSelect } from "@/components/ui/async-select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "lucide-react";
import { useState } from "react";
import { withForm } from "~/event-creation-card/hooks/form";
import type { Participant } from "~/event-creation-card/schemas/participants";
import { defaultFormOptions } from "~/event-creation-card/shared/form-defaults";
import {
  type User,
  searchUsers,
  users,
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
          />
        )}
      </form.Field>
    );
  },
});

interface ParticipantsFieldProps {
  value: Participant[];
  onChange: (value: Participant[]) => void;
}

const Participants = ({ value, onChange }: ParticipantsFieldProps) => {
  const [participants, setParticipants] = useState<User[]>(
    users.filter((user) => value.some((v) => v.id === user.id)),
  );

  const handleChange = (participants: User[]) => {
    setParticipants(participants);
    onChange(participants);
  };

  return (
    <div className="flex gap-x-3 px-4 items-center">
      <Users className="text-muted-foreground/80 size-4" />
      <div className="flex-1">
        <AsyncSelect<User>
          label="Users"
          placeholder="No participants"
          noResultsMessage="No users found"
          triggerClassName="shadow-none border-none bg-transparent hover:bg-transparent h-6 p-0.5"
          getDisplayValue={SelectedParticipants}
          renderOption={ParticipantOption}
          getOptionValue={(user) => user.id}
          value={participants}
          onChange={handleChange}
          fetcher={searchUsers}
          multiple
        />
      </div>
    </div>
  );
};

function ParticipantOption(user: User) {
  return (
    <div className="flex items-center gap-3 px-2">
      <Avatar className="size-6">
        <AvatarImage src={user.avatarUrl} alt={`${user.name} avatar`} />
        <AvatarFallback>{user.initials}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <div className="font-medium text-sm leading-none">{user.name}</div>
        <div className="text-xs text-muted-foreground leading-tight">
          {user.email}
        </div>
      </div>
    </div>
  );
}

function SelectedParticipants(participants: User[]) {
  if (participants.length === 0) return null;

  const sorted = [...participants].sort(
    (a, b) => a.name.length - b.name.length,
  );
  const displayText = sorted
    .slice(0, 2)
    .map((p) => p.name)
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
