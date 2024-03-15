import NextLink from "next/link";
import React from "react";
import { useSidebarContext } from "./LayoutContext";
import clsx from "clsx";

interface Props {
  title: string;
  icon: React.ReactNode;
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
        {icon}
        <span className={clsx(
          isActive
            ? "text-[#FFFFFF]"
            : "text-[#000000]",
          ""
        )}>{title}</span>
      </div>
    </NextLink>
  );
};
