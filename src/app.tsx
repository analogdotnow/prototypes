import AnalogIcon from "@/assets/analog-icon.svg?react";
import AnalogLogo from "@/assets/analog-logo.svg?react";
import PrototypeSettings from "@/components/settings";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
  useSidebar,
} from "@/components/sidebar";
import ThemeToggle from "@/components/theme-toggle";
import type { PrototypeEntry } from "@/types";
import { motion } from "motion/react";
import { prototypes } from "./prototypes";

export default function App() {
  const CurrentPrototypeSettings = prototypes[0].settings;

  return (
    <main className="flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full overflow-hidden min-h-screen">
      <div className="absolute top-4 left-7 z-30 flex gap-2">
        <ThemeToggle />
        <PrototypeSettings>
          {CurrentPrototypeSettings && <CurrentPrototypeSettings />}
        </PrototypeSettings>
      </div>
      <Dashboard prototype={prototypes[0]} />
      <Sidebar>
        <SidebarBody
          className="h-auto"
          transition={{
            default: {
              type: "spring",
              stiffness: 250,
              damping: 40,
            },
          }}
        >
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Logo />
            <div className="mt-8 flex flex-col gap-2">
              {prototypes.map((prototype, index) => (
                <SidebarLink
                  key={prototype.id}
                  link={{
                    label: prototype.name,
                    href: `/${prototype.id}`,
                    icon: (
                      <span className="bg-primary text-primary-foreground rounded-full size-6 flex flex-shrink-0 pt-[1.5px] justify-center text-sm font-mono">
                        {index + 1}
                      </span>
                    ),
                  }}
                />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
    </main>
  );
}

export const Logo = () => {
  const { open } = useSidebar();
  return (
    <div className="flex space-x-2.5 items-center py-1 relative z-20 text-foreground select-none">
      <AnalogIcon className="size-6 shrink-0 mb-[0.35rem]" />
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: open ? 1 : 0 }}>
        <AnalogLogo className="h-[1.65rem] shrink-0" />
      </motion.span>
    </div>
  );
};

const Dashboard = ({ prototype }: { prototype: PrototypeEntry }) => {
  const Prototype = prototype?.component;

  return (
    <div className="flex flex-1">
      <div className="p-2 md:px-7 md:py-4 rounded-r-2xl border-r border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex-1 size-full">
        <div className="container mx-auto flex flex-col gap-y-10 h-full items-center">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-3xl font-medium font-display text-foreground">
              {prototype?.name}
            </h1>
            <p className="text-sm text-muted-foreground max-w-80 text-pretty leading-tight">
              {prototype?.description}
            </p>
          </div>
          {Prototype ? (
            <Prototype />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>No prototype selected</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
