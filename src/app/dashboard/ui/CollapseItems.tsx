"use client";
import React, { useState } from "react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { Accordion, AccordionItem, Image } from "@nextui-org/react";
import clsx from "clsx";
import {
  Cog8ToothIcon,
  ComputerDesktopIcon,
  DocumentArrowDownIcon,
  GiftTopIcon,
  HandRaisedIcon,
  HomeIcon,
  TicketIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
interface Item {
  name: string;
  url: string;
  icon: string;
}

interface Props {
  icon: string;
  title: string;
  items: Item[];
}

export const CollapseItems = ({ icon, items, title }: Props) => {
  const [open, setOpen] = useState(false);
  const getIconComponent = (iconText: string) => {
    // Agrega más casos según los iconos que puedas tener en tu base de datos
    switch (iconText) {
      case "TicketIcon":
        return <TicketIcon className="h-6 w-6 text-[var(--color-neutral)] " />;
      case "HomeIcon":
        return <HomeIcon className="h-6 w-6 text-[var(--color-neutral)]" />;
      case "UsersIcon":
        return <UsersIcon className="h-6 w-6 text-[var(--color-neutral)]" />;
      case "DocumentArrowDownIcon":
        return (
          <DocumentArrowDownIcon className="h-6 w-6 text-[var(--color-neutral)]" />
        );
      case "GiftTopIcon":
        return <GiftTopIcon className="h-6 w-6 text-[var(--color-neutral)]" />;
      case "ComputerDesktopIcon":
        return (
          <ComputerDesktopIcon className="h-6 w-6 text-[var(--color-neutral)]" />
        );
      case "HandRaisedIcon":
        return (
          <HandRaisedIcon className="h-6 w-6 text-[var(--color-neutral)] " />
        );
      case "Cog8ToothIcon":
        return (
          <Cog8ToothIcon className="h-6 w-6 text-[var(--color-neutral)] " />
        );
      default:
        return null; // Si el icono no coincide con ninguno conocido, devuelve null
    }
  };
  return (
    <div className="flex gap-4 h-full items-center cursor-pointer text-[0.8rem]">
      <Accordion className="px-0">
        <AccordionItem
          indicator={<ChevronUpIcon className="h-5" color="black" />}
          classNames={{
            indicator: "data-[open=true]:-rotate-180",
            trigger:
              "py-0 min-h-[44px] hover:bg-default-100 rounded-xl active:scale-[0.98] transition-transform px-3",

            title: "px-0 flex text-sm gap-2 h-full items-center cursor-pointer",
          }}
          aria-label="Accordion 1"
          title={
            <div className="flex flex-row gap-3">
              {getIconComponent(icon) || (
                <Image
                  src=""
                  alt={title}
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
              )}
              <span>{title}</span>
            </div>
          }
        >
          <div className="pl-7 flex flex-col gap-2">
            {items.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  className="w-full flex text-default-500 hover:text-default-900 transition-colors gap-2"
                >
                  {getIconComponent(item.icon) || (
                    <Image
                      src=""
                      alt={title}
                      width={24}
                      height={24}
                      className="h-6 w-6"
                    />
                  )}
                  {item.name}
                </a>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
