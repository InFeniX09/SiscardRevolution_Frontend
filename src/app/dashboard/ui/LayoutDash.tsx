"use client";
import { BreadcrumbComponent } from "@/src/components/ui/Breadcrumb/Breadcrumb";
import NavbarPage from "./Navbar";
import { Sidebar } from "./Sibebar";
import { useState } from "react";
import clsx from "clsx";
import { HomeIcon, TicketIcon, UsersIcon } from "@heroicons/react/24/solid";

interface Props {
  children: React.ReactNode;
  nombreusuario: string;
}

export default function LayoutDashComponent({
  children,
  nombreusuario,
}: Props) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  

  return (
    <>
      <div
        className={clsx(
          isSidebarCollapsed ? "w-[18rem] " : "w-[10rem] ",
          "sm:flex hidden flex-col absolute top-0 bottom-0 left-0 z-[1] h-full  transition-width duration-500 ease-in-out"
        )}
      >
        <Sidebar
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>
      <div
        className={clsx(
          isSidebarCollapsed ? "sm:pl-[18rem]" : "sm:pl-[10rem]",
          "pl-[0rem] p-0 sm:p-3 h-full transition-padding-left duration-500 ease-in-out"
        )}
      >
        <div
          className="w-full h-full bg-cover rounded-2xl  flex flex-col gap-5 bg-[image:var(--dashboard-bg)]
            before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-screen "
        >
          <div className="bg-[var(--dashboard-Dash)] h-full w-full flex flex-col p-2 gap-3 overflow-hidden relative rounded-2xl backdrop-filter blur-1 font-semibold text-base">
            <NavbarPage nombreusuario={nombreusuario} />
            <div className="bg-[var(--dashboard-Dash1)] h-[92%] overflow-auto p-3 flex flex-col gap-4 rounded-2xl">
              <BreadcrumbComponent />
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
