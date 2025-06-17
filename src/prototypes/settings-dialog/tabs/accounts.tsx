import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SiApple, SiGoogle } from "@icons-pack/react-simple-icons";
import { LoaderCircle, Plus } from "lucide-react";
import { useId, useState } from "react";
import MicrosoftLogo from "../assets/microsoft-logo.svg?react";

type Account = {
  id: string;
  email: string;
  provider: "google" | "apple" | "microsoft";
  color: string;
  connected: boolean;
  connecting?: boolean;
};

const calendarColors = [
  { name: "red", value: "#fb2c36", bgClass: "bg-calendar-red" },
  { name: "orange", value: "#ff6900", bgClass: "bg-calendar-orange" },
  { name: "yellow", value: "#f0b100", bgClass: "bg-calendar-yellow" },
  { name: "green", value: "#00c950", bgClass: "bg-calendar-green" },
  { name: "blue", value: "#2b7fff", bgClass: "bg-calendar-blue" },
  { name: "purple", value: "#ad46ff", bgClass: "bg-calendar-purple" },
];

const mockAccounts: Account[] = [
  {
    id: "1",
    email: "aaron.mahlke@gmail.com",
    provider: "google",
    color: calendarColors[5].value,
    connected: true,
  },
  {
    id: "2",
    email: "aaron@mahlke.design",
    provider: "google",
    color: calendarColors[2].value,
    connected: true,
  },
  {
    id: "3",
    email: "jean@outlook.com",
    provider: "microsoft",
    color: calendarColors[4].value,
    connected: true,
  },
];

export default function Accounts() {
  const [defaultAccount, setDefaultAccount] = useState<string>("1");
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);

  const updateAccountColor = (accountId: string, color: string) => {
    setAccounts((prev) =>
      prev.map((account) =>
        account.id === accountId ? { ...account, color } : account,
      ),
    );
  };

  const disconnectAccount = (accountId: string) => {
    setAccounts((prev) => prev.filter((account) => account.id !== accountId));
    if (defaultAccount === accountId) {
      const remainingAccounts = accounts.filter(
        (account) => account.id !== accountId,
      );
      if (remainingAccounts.length > 0) {
        setDefaultAccount(remainingAccounts[0].id);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="space-y-4">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-md font-light">Default Calendar</h2>
          <p className="text-sm text-muted-foreground">
            Events will be created in this calendar by default
          </p>
        </div>

        <DefaultCalendarSelect
          accounts={accounts}
          value={defaultAccount}
          onChange={setDefaultAccount}
        />
      </section>

      <Separator />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-md font-light">Accounts</h2>
            <p className="text-sm text-muted-foreground">
              Accounts that Analog can read and write to
            </p>
          </div>
          <AddAccountButton />
        </div>

        <AccountsList
          accounts={accounts}
          defaultAccount={defaultAccount}
          onColorChange={updateAccountColor}
          onDisconnect={disconnectAccount}
        />
      </section>
    </div>
  );
}

function ColoredSquare({
  color,
  className = "",
  children,
}: { color: string; className?: string; children?: React.ReactNode }) {
  return (
    <div
      className={`size-4 rounded-sm flex items-center justify-center text-xs font-medium text-white ${className}`}
      style={{ backgroundColor: color }}
    >
      {children}
    </div>
  );
}

function AccountIcon({
  provider,
}: { provider: "google" | "apple" | "microsoft" }) {
  const iconSize = 16;

  switch (provider) {
    case "google":
      return <SiGoogle size={iconSize} />;
    case "apple":
      return <SiApple size={iconSize} />;
    case "microsoft":
      return <MicrosoftLogo className="size-4" />;
    default:
      return null;
  }
}

function ColorPicker({
  currentColor,
  onColorChange,
}: { currentColor: string; onColorChange: (color: string) => void }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="p-1 h-auto hover:bg-muted/50"
        >
          <ColoredSquare color={currentColor} className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3 rounded-lg" align="start">
        <div className="grid grid-cols-3 gap-2">
          {calendarColors.map((color) => (
            <Button
              key={color.name}
              variant="ghost"
              size="sm"
              className="p-1 h-auto hover:bg-muted/50"
              onClick={() => onColorChange(color.value)}
            >
              <ColoredSquare color={color.value} className="size-6" />
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function AccountRow({
  account,
  isDefault,
  onColorChange,
  onDisconnect,
}: {
  account: Account;
  isDefault: boolean;
  onColorChange: (color: string) => void;
  onDisconnect: () => void;
}) {
  return (
    <div className="flex items-center gap-3 py-2 px-3 rounded-xl hover:bg-muted-foreground/5 border border-border/80">
      <ColorPicker currentColor={account.color} onColorChange={onColorChange} />

      <AccountIcon provider={account.provider} />

      <span className="flex-1 text-sm">{account.email}</span>

      {account.connecting ? (
        <LoaderCircle className="size-4 animate-spin text-muted-foreground" />
      ) : !isDefault ? (
        <Button
          variant="ghost"
          size="sm"
          onClick={onDisconnect}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          Disconnect
        </Button>
      ) : null}
    </div>
  );
}

function DefaultCalendarSelect({
  accounts,
  value,
  onChange,
}: {
  accounts: Account[];
  value: string;
  onChange: (value: string) => void;
}) {
  const id = useId();

  return (
    <div className="w-fit">
      <Label htmlFor={id} className="sr-only">
        Default Calendar
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          id={id}
          className="ps-2 [&>span]:flex [&>span]:items-center [&>span]:gap-3 [&>span_[data-square]]:shrink-0 border-border/80"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-3">
          {accounts.map((account) => (
            <SelectItem key={account.id} value={account.id}>
              <ColoredSquare color={account.color} data-square />
              <span className="truncate">{account.email}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function AccountsList({
  accounts,
  defaultAccount,
  onColorChange,
  onDisconnect,
}: {
  accounts: Account[];
  defaultAccount: string;
  onColorChange: (accountId: string, color: string) => void;
  onDisconnect: (accountId: string) => void;
}) {
  return (
    <div className="space-y-3">
      {accounts.map((account) => (
        <AccountRow
          key={account.id}
          account={account}
          isDefault={account.id === defaultAccount}
          onColorChange={(color) => onColorChange(account.id, color)}
          onDisconnect={() => onDisconnect(account.id)}
        />
      ))}
    </div>
  );
}

function AddAccountButton() {
  return (
    <Button
      variant="outline"
      className="bg-transparent pr-4 hover:bg-muted-foreground/5"
      size="sm"
    >
      <Plus className="size-4" />
      Add Account
    </Button>
  );
}
