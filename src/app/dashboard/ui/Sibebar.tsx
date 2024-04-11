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
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Menu } from "@/src/interfaces";
import { auth } from "@/src/auth.config";
import { getlistarMenuxUsuarioxPerfil } from "@/src/actions/menu";
import { useSession } from 'next-auth/react';

interface Props {
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

export const Sidebar = ({ isSidebarCollapsed, onToggleSidebar }: Props) => {
  const [menuItems, setMenuItems] = useState<Menu[]>([]);
  const { data: session, status } = useSession();

 useEffect(() => {
  const fetchData = async () => {
    if (status === 'authenticated') {
      try {
        const response = await getlistarMenuxUsuarioxPerfil(session?.user.IdUsuario, session?.user.Puesto_id);
        setMenuItems(response);
        console.log(session?.user.IdUsuario); // Log only once after successful authentication
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    }
  };

  // Only call fetchData when session.status changes from any value to 'authenticated'
  fetchData();
}, [status]);


  
  
  const renderMenuItems = () => {
    return menuItems.map((menuItem) => {
      switch (menuItem.idTipoMenu) {
        case 1:
          return (
            <SidebarMenu key={menuItem.IdMenu} title={menuItem.Menu}>
              {renderSubMenuItems(menuItem.IdMenu)}
            </SidebarMenu>
          );

        default:
          return null;
      }
    });
  };

  const renderSubMenuItems = (parentId: number) => {
    return menuItems
      .filter((menuItem) => menuItem.idPadre === parentId)
      .map((menuItem) => {
        switch (menuItem.idTipoMenu) {
          case 2:
            return (
              <SidebarItem
                key={menuItem.IdMenu}
                title={menuItem.Menu}
                icon={<HomeIcon className="h-5" />}
                isActive={false} // Define tu lógica para establecer la activación del elemento
                href={menuItem.Ruta}
              />
            );
          case 3:
            const subItems = menuItems.filter(
              (item) => item.idPadre === menuItem.IdMenu
            );
            return (
              <CollapseItems
                key={menuItem.IdMenu}
                title={menuItem.Menu}
                icon={<ChartBarIcon className="h-5" />}
                items={subItems.map((subItem) => ({
                  name: subItem.Menu,
                  url: subItem.Ruta,
                }))}
              />
            );
          default:
            return null;
        }
      });
  };

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
              "text-[1.5rem] text-[var(--color-neutral)]"
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
        {renderMenuItems()}
      </div>
    </>
  );
};
