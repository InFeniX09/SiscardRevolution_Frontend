"use client";
import React from "react";
import {
  Bars4Icon,
  ChatBubbleLeftRightIcon,
  MegaphoneIcon,
  IdentificationIcon,
  CurrencyDollarIcon,
  BellIcon
} from "@heroicons/react/24/solid";
import { Avatar, Input, Navbar, NavbarContent } from "@nextui-org/react";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { DarkModeSwitch } from "./DarkmodeSwitch";


interface Props {
  nombreusuario:string;
}


export default function NavbarPage({ nombreusuario }: Props){
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
          <ChatBubbleLeftRightIcon className="h-5" />
        </div>
        <div className="flex items-center gap-2 ">
          <MegaphoneIcon className="h-5" />
        </div>
        <div className="flex items-center gap-2 ">
          <IdentificationIcon className="h-5" />
        </div>
        <div className="flex items-center gap-2 ">
          <BellIcon className="h-5" />
        </div>
      </NavbarContent>
      <NavbarContent
        justify="end"
        className="w-fit data-[justify=end]:flex-grow-0 "
      >
        <div className="flex items-center justify-center gap-1">
          <CurrencyDollarIcon className="h-6" />
          <p>S/200.00</p>
        </div>

        <div className="flex items-center justify-center gap-2 cursor-pointer">
          <Avatar
            isBordered
            radius="full"
            src="https://i.pravatar.cc/150?u=a04258114e29026708c"
            className="h-10 w-10   sm:h-8 sm:w-8 "
          />
          <span>{nombreusuario}</span>
        </div>
      </NavbarContent>
    </Navbar>
  );
};
