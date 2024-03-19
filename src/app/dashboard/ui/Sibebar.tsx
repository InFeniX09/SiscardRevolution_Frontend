import {
  ComputerDesktopIcon,
  ChatBubbleLeftRightIcon,
  TicketIcon,
  ChartBarIcon,
  InboxStackIcon,
  HomeIcon,
  UsersIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { SidebarItem } from "./SidebarItem";
import { usePathname } from "next/navigation";
import { SidebarMenu } from "./SidebarMenu";
import { CollapseItems } from "./CollapseItems";
import Image from "next/image";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { useState } from "react";
import clsx from "clsx";

interface Props {
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

export const Sidebar = ({ isSidebarCollapsed, onToggleSidebar }: Props) => {
  const pathname = usePathname();

  return (
    <>
      <div className="flex p-3 justify-between items-center h-[12%] w-full">
        <div className="flex items-center">
          <Image
            width={80}
            height={80}
            src={"/dashboard/LogoSiscardPeru.png"}
            alt="d"
            className="flex-none flex-shrink-0"
          />
          <span
            className={clsx(
              isSidebarCollapsed ? "block" : "hidden",
              "text-[1.5rem]"
            )}
          >
            <strong>Siscard</strong>
          </span>
        </div>
        {isSidebarCollapsed ? (
          <ChevronLeftIcon
            className="h-5 cursor-pointer"
            onClick={onToggleSidebar}
          />
        ) : (
          <ChevronRightIcon
            className="h-5 cursor-pointer"
            onClick={onToggleSidebar}
          />
        )}
      </div>
      <div
        className={`w-full flex flex-col gap-1 h-full overflow-hidden text-[0.8rem] px-2 `}
      >
        <SidebarItem
          title="Inicio"
          icon={<HomeIcon className="h-5" />}
          isActive={pathname === "/dashboard"}
          href="/dashboard"
        />
        <SidebarItem
          title="Centro de atención"
          icon={<TicketIcon className="h-5" />}
          isActive={pathname === "/dashboard/centro-atencion"}
          href="/dashboard/centro-atencion"
        />
        <SidebarItem
          title="Inventario departamental"
          icon={<InboxStackIcon className="h-5" />}
          isActive={pathname === "/dashboard/inventario-departamental"}
          href="/dashboard/inventario-departamental"
        />
        <SidebarItem
          title="Usuarios"
          icon={<UsersIcon className="h-5" />}
          isActive={pathname === "/dashboard/usuarios"}
          href="/dashboard/usuarios"
        />
        <SidebarMenu title="Logistica">
          <CollapseItems
            icon={<ChartBarIcon className="h-5 " />}
            items={["Banks Accounts", "Credit Cards", "Loans"]}
            title="Balances"
          />
        </SidebarMenu>
      </div>
      <div className={`flex w-full p-3`}>
        <Popover placement="right" className="w-full">
          <PopoverTrigger>
            <Button className="flex h-16 w-full border-orange-900/40 border-1 backdrop-blur p-1 bg-white bg-opacity-50">
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              <div className=" flex-col group-hover/edit:flex ">
                <h1>Joseph Castillo Rivera</h1>
                <span>Analista de sistemas</span>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2 bg-white bg-opacity-50">
              <div className="text-small font-bold">Configuracion</div>
              <div className="text-small font-bold">Salir</div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};
