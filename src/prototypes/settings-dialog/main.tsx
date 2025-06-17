import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, SlidersVertical, UsersRound, X } from "lucide-react";
import Accounts from "./tabs/accounts";
import General from "./tabs/general";
import Notifications from "./tabs/notifications";

const tabs = {
  accounts: {
    title: "Accounts",
    icon: UsersRound,
    component: Accounts,
  },
  general: {
    title: "General",
    icon: SlidersVertical,
    component: General,
  },
  notifications: {
    title: "Notifications",
    icon: Bell,
    component: Notifications,
  },
};

export default function App() {
  return (
    <section className="flex-1 w-full flex flex-col items-center justify-center">
      <div className="border border-border rounded-2xl py-4 px-5 bg-accent relative">
        <Tabs
          defaultValue="accounts"
          orientation="vertical"
          className="w-[45rem] flex-row h-full gap-3"
        >
          <TabsList className="flex-col gap-1 bg-transparent py-0 justify-start w-[12rem] shrink-0">
            {Object.entries(tabs).map(([key, value]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="data-[state=active]:bg-primary-foreground/50 w-full justify-start data-[state=active]:shadow-none"
              >
                <value.icon className="size-4 mr-4" /> {value.title}
              </TabsTrigger>
            ))}
          </TabsList>
          <Separator
            orientation="vertical"
            className="bg-transparent bg-[linear-gradient(to_bottom_in_oklab,transparent_0%,var(--border)_15%,var(--border)_85%,transparent_100%)]"
          />
          <div className="grow text-start min-h-[30rem] [&>div]:h-full px-3">
            {Object.entries(tabs).map(([key, value]) => (
              <TabsContent key={key} value={key}>
                <value.component />
              </TabsContent>
            ))}
          </div>
        </Tabs>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-2 right-3 size-7 bg-primary-foreground/40 hover:bg-primary-foreground/80 border-none shadow-none"
        >
          <X className="size-4" />
        </Button>
      </div>
    </section>
  );
}
