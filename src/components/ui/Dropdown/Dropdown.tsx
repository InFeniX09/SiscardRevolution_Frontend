import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";

interface Props{
    name:string
}

export default function DropdownComponent({name}:Props) {
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
              className:"h-10 w-10   sm:h-8 sm:w-8"
            }}
            className="transition-transform"
            name={name}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Nombre:</p>
            <p className="font-bold">Joseph Yeremy Castillo Rivera</p>
          </DropdownItem>
          <DropdownItem key="settings">
            Mi Configuración
          </DropdownItem>
          <DropdownItem key="logout" color="danger">
            Cerrar Sesión
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
