"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import {
  Bars4Icon,
  ChatBubbleLeftRightIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/solid";
import { Input, Navbar, NavbarContent } from "@nextui-org/react";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { DarkModeSwitch } from "./DarkmodeSwitch";

export const NavbarPage = () => {
  return (
    <Navbar
      className="w-full rounded-[200px] h-[8%]"
      classNames={{
        wrapper: "w-full max-w-full",
      }}
    >
      <NavbarContent className="md:hidden">
        <Bars4Icon className="h-1" />
      </NavbarContent>
      <NavbarContent className="w-full max-md:hidden">
        <Input
          startContent={<Bars4Icon className="h-5" />}
          className="w-full"
          placeholder="Search..."
        />
      </NavbarContent>
      <NavbarContent
        justify="end"
        className="w-fit data-[justify=end]:flex-grow-0"
      >
        <DarkModeSwitch/>
        <div className="flex items-center gap-2 max-md:hidden">
          <ChatBubbleLeftRightIcon className="h-5" />
        </div>
        <div className="flex items-center gap-2 max-md:hidden">
          <MegaphoneIcon className="h-5" />
        </div>
      </NavbarContent>
    </Navbar>
  );
};
