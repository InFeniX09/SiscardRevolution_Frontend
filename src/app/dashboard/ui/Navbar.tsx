"use client";
import React from "react";
import {
  Bars4Icon,
  ChatBubbleLeftRightIcon,
  MegaphoneIcon,
  IdentificationIcon,
  CurrencyDollarIcon,
  BellIcon,
  WalletIcon,
  TicketIcon,
  WindowIcon,
} from "@heroicons/react/24/solid";
import {
  Avatar,
  Input,
  Navbar,
  NavbarContent,
  Tooltip,
} from "@nextui-org/react";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { DarkModeSwitch } from "./DarkmodeSwitch";
import DropdownComponent from "@/src/components/ui/Dropdown/Dropdown";
import ModalChatComponent from "@/src/components/ui/Modal/ModalChat";

interface Props {
  nombreusuario: string;
  issidebarcollapsedmobile: boolean;
  onToggleSidebarMobile: () => void;
}

export default function NavbarPage({ nombreusuario,issidebarcollapsedmobile,onToggleSidebarMobile }: Props) {
  return (
    <Navbar
      className="w-full rounded-[200px] bg-[var(--colorcontra-neutral)]"
      classNames={{
        wrapper: "w-full max-w-full px-3",
      }}
    >
      <NavbarContent
        justify="start"
        className="w-fit data-[justify=end]:flex-grow-0"
      >
        {issidebarcollapsedmobile ? (
         <Bars4Icon className="hidden max-sm:block h-5"  onClick={onToggleSidebarMobile}/>
        ) : (
          <Bars4Icon className="hidden max-sm:block h-5"  onClick={onToggleSidebarMobile}/>
        )}
        <DarkModeSwitch />
        <div className="flex items-center gap-2 ">
          <Tooltip content="Identificación">
            <IdentificationIcon className="h-5 text-[var(--color-neutral)]" />
          </Tooltip>
        </div>
        <div className="flex items-center gap-2 ">
          <ModalChatComponent />
        </div>
        <div className="flex items-center gap-2 ">
          <Tooltip content="Alertas">
            <MegaphoneIcon className="h-5 text-[var(--color-neutral)]" />
          </Tooltip>
        </div>
        <div className="flex items-center gap-2 ">
          <Tooltip content="Notificaciones">
            <BellIcon className="h-5 text-[var(--color-neutral)]" />
          </Tooltip>
        </div>
      </NavbarContent>
      <NavbarContent
        justify="end"
        className="w-fit data-[justify=end]:flex-grow-0 "
      >
        <div className="flex items-center justify-center gap-1">
          <Tooltip content="Billetera">
            <WalletIcon className="h-6 text-[var(--color-neutral)]" />
          </Tooltip>

          <p className="text-[var(--color-neutral)]">S/200.00</p>
        </div>
        <DropdownComponent name={nombreusuario} />
      </NavbarContent>
    </Navbar>
  );
}
