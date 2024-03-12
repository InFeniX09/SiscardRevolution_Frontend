"use client";
import {
  ComputerDesktopIcon,
  ChatBubbleLeftRightIcon,
  TicketIcon,
  ChartBarIcon,
  InboxStackIcon,
  HomeIcon,
  UsersIcon,
  ChevronLeftIcon,
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

export const Sidebar = () => {
  const pathname = usePathname();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    alert(isSidebarCollapsed);
  };

  return (
    <>
      <div className="flex p-3 justify-between items-center h-[8%]">
        <div className="flex items-center">
          <Image
            width={48}
            height={48}
            src={"/dashboard/LogoSiscardPeru.png"}
            alt="d"
            className="flex-none flex-shrink-0"
          />
          <span className="text-2xl">
            <strong>Siscard</strong>
          </span>
        </div>
        <ChevronLeftIcon
          className="h-1 cursor-pointer"
          onClick={toggleSidebar}
        />
      </div>
      <div className={`flex flex-col gap-1 h-full overflow-hidden`}>
        <SidebarItem
          title="Inicio"
          icon={<HomeIcon className="flex-none flex-shrink-0 w-16 h-5" />}
          isActive={pathname === "/dashboard"}
          href="/dashboard"
        />
        <SidebarItem
          title="Centro de atención"
          icon={<TicketIcon className="flex-none flex-shrink-0 w-16 h-5" />}
          isActive={pathname === "/dashboard/centro-atencion"}
          href="/dashboard/centro-atencion"
        />
        <SidebarItem
          title="Inventario departamental"
          icon={<InboxStackIcon className="flex-none flex-shrink-0 w-16 h-5" />}
          isActive={pathname === "/dashboard/inventario-departamental"}
          href="/dashboard/inventario-departamental"
        />
        <SidebarItem
          title="Usuarios"
          icon={<UsersIcon className="flex-none flex-shrink-0 w-16 h-5" />}
          isActive={pathname === "/dashboard/usuarios"}
          href="/dashboard/usuarios"
        />
        <SidebarMenu title="Logistica">
          <CollapseItems
            icon={
              <ChartBarIcon className="flex-none flex-shrink-0 w-16 h-5 " />
            }
            items={["Banks Accounts", "Credit Cards", "Loans"]}
            title="Balances"
          />
        </SidebarMenu>
      </div>
      <div className={`flex`}>
        <h1>23</h1>
        <Popover placement="right">
          <PopoverTrigger>
            <Button className="flex h-16 border-orange-900/40 border-1 backdrop-blur p-1">
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              <div className=" flex-col group-hover/edit:flex hidden">
                <h1>Joseph Castillo Rivera</h1>
                <span>Analista de sistemas</span>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2 ">
              <div className="text-small font-bold">Popover Content</div>
              <div className="text-tiny">This is the popover content</div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};
