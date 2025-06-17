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
import { useFeedback } from "@/hooks/use-feedback";
import type { PrototypeEntry } from "@/types";
import { useMediaQuery } from "@react-hookz/web";
import { motion } from "motion/react";
import { Outlet, useParams } from "react-router";
import { Toaster } from "sonner";
import { prototypes } from "./prototypes";

export function AppLayout() {
  return (
    <main className="flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full overflow-hidden min-h-svh h-dvh md:h-auto">
      <div className="absolute bottom-3.5 left-6 md:bottom-auto md:top-4 md:left-7 z-30 flex gap-2">
        <ThemeToggle />
        <PrototypeSettings />
      </div>
      <Outlet />
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
                    href: `/proto/${prototype.id}`,
                    index,
                  }}
                />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <Toaster position="bottom-center" />
    </main>
  );
}

export const Dashboard = () => {
  const isMobile = useMediaQuery("only screen and (max-width : 768px)");
  const { prototypeId } = useParams<{ prototypeId: string }>();

  const prototype = prototypes.find(
    (p) => p.id === prototypeId,
  ) as PrototypeEntry;
  const Prototype =
    isMobile && prototype.mobileDisabled
      ? MobileDisabledFallback
      : prototype.component;

  useFeedback();

  return (
    <div className="flex-1 min-h-0 md:min-h-auto">
      <div className="border-b rounded-b-2xl md:border-r md:rounded-bl-none md:rounded-tr-2xl md:border-b-0 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 size-full overflow-clip">
        <div className="container mx-auto flex flex-col h-full items-center overflow-auto md:overflow-clip scrollbar-hidden p-4 md:px-7">
          <div className="flex flex-col gap-2 text-center pb-3">
            <h1 className="md:text-3xl text-2xl font-medium font-display text-foreground">
              {prototype.name}
            </h1>
            <p className="text-sm text-muted-foreground md:max-w-80 max-w-72 text-pretty leading-tight">
              {prototype.description}
            </p>
          </div>
          {Prototype ? (
            <Prototype />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>No prototype available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function MobileDisabledFallback() {
  return (
    <div className="flex flex-col items-center size-full justify-center">
      <span className="text-6xl mb-6">🫠</span>
      <h1 className="text-2xl font-medium font-display text-foreground mb-2">
        Mobile not supported
      </h1>
      <p className="w-4/5 text-center text-pretty">
        Damn, this looks okay only on desktop. So sorry.
      </p>
    </div>
  );
}

function Logo() {
  const { open } = useSidebar();
  return (
    <div className="flex space-x-2.5 items-center py-1 relative z-20 text-foreground select-none">
      <AnalogIcon className="size-6 shrink-0 mb-[0.35rem]" />
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: open ? 1 : 0 }}>
        <AnalogLogo className="h-[1.65rem] shrink-0" />
      </motion.span>
    </div>
  );
}
