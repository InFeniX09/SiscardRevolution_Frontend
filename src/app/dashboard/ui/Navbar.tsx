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
}

export default function NavbarPage({ nombreusuario }: Props) {
  return (
    <Navbar
      className="w-full rounded-[200px] h-[8%] "
      classNames={{
        wrapper: "w-full max-w-full px-3",
      }}
    >
      <NavbarContent
        justify="start"
        className="w-fit data-[justify=end]:flex-grow-0"
      >
        <DarkModeSwitch />
        <div className="flex items-center gap-2 ">
          <Tooltip content="Identificación">
            <IdentificationIcon className="h-5" />
          </Tooltip>
        </div>
        <div className="flex items-center gap-2 ">
          <ModalChatComponent />
        </div>
        <div className="flex items-center gap-2 ">
          <Tooltip content="Alertas">
            <MegaphoneIcon className="h-5" />
          </Tooltip>
        </div>
        <div className="flex items-center gap-2 ">
          <Tooltip content="Notificaciones">
            <BellIcon className="h-5" />
          </Tooltip>
        </div>
      </NavbarContent>
      <NavbarContent
        justify="end"
        className="w-fit data-[justify=end]:flex-grow-0 "
      >
        <div className="flex items-center justify-center gap-1">
          <Tooltip content="Billetera">
            <WalletIcon className="h-6" />
          </Tooltip>

          <p>S/200.00</p>
        </div>
        <DropdownComponent name={nombreusuario} />
      </NavbarContent>
    </Navbar>
  );
}
