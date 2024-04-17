import NextLink from "next/link";
import React from "react";
import { useSidebarContext } from "./LayoutContext";
import clsx from "clsx";
import {
  ComputerDesktopIcon,
  DocumentArrowDownIcon,
  GiftTopIcon,
  HandRaisedIcon,
  HomeIcon,
  TicketIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

interface Props {
  title: string;
  icon: string;
  isActive?: boolean;
  href?: string;
}

export const SidebarItem = ({ icon, title, isActive, href = "" }: Props) => {
  const { collapsed, setCollapsed } = useSidebarContext();

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setCollapsed();
    }
  };
  const getIconComponent = (iconText: string) => {
    // Agrega más casos según los iconos que puedas tener en tu base de datos
    switch (iconText) {
      case "TicketIcon":
        return <TicketIcon className="h-6 w-6" />;
      case "HomeIcon":
        return <HomeIcon className="h-6 w-6" />;
      case "UsersIcon":
        return <UsersIcon className="h-6 w-6" />;
      case "DocumentArrowDownIcon":
        return <DocumentArrowDownIcon className="h-6 w-6" />;
      case "GiftTopIcon":
        return <GiftTopIcon className="h-6 w-6" />;
      case "ComputerDesktopIcon":
        return <ComputerDesktopIcon className="h-6 w-6" />;
      case "HandRaisedIcon":
        return <HandRaisedIcon className="h-6 w-6" />;
      default:
        return null; // Si el icono no coincide con ninguno conocido, devuelve null
    }
  };
  return (
    <NextLink
      href={href}
      className="text-default-900 active:bg-none max-w-full"
    >
      <div
        className={clsx(
          isActive
            ? "bg-[#FD696E] bg-opacity-70  [&_svg_path]:fill-[#FFFFFF] border-opacity-70 border-1 border-white rounded-2xl"
            : "hover:bg-default-100 hover:rounded-2xl",
          "flex items-center w-full px-3 py-[0.10rem] gap-3"
        )}
        onClick={handleClick}
      >
        {getIconComponent(icon) || ( // Intenta obtener el componente de icono
          <Image
            src=""
            alt={title}
            width={24}
            height={24}
            className="h-6 w-6"
          />
        )}
        <span
          className={clsx(isActive ? "text-red-400" : "text-[#000000]", "")}
        >
          {title}
        </span>
      </div>
    </NextLink>
  );
};
