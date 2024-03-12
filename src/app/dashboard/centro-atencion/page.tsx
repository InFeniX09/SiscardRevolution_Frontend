import React from "react";
import {
  TicketIcon,
  ClipboardDocumentCheckIcon,
  DocumentIcon,
} from "@heroicons/react/24/solid";
import CardinfoComponent from "./ui/Cardinfo";

export default function page() {
  const data = [
    {
      icon: <TicketIcon className="h-5" />,
      cantidad: 3,
      titulo: "Ticket Total",
      dia: "Hoy",
    },
    {
      icon: <TicketIcon className="h-5" />,
      cantidad: 3,
      titulo: "Ticket Total",
      dia: "Hoy",
    },
    {
      icon: <TicketIcon className="h-5" />,
      cantidad: 3,
      titulo: "Ticket Total",
      dia: "Hoy",
    },
    {
      icon: <TicketIcon className="h-5" />,
      cantidad: 3,
      titulo: "Ticket Total",
      dia: "Hoy",
    },
  ];
  const data1 = [
    {
      icon: <TicketIcon className="h-5" />,
      cantidad: 3,
      titulo: "Ticket Total",
      dia: "Hoy",
    },
    {
      icon: <TicketIcon className="h-5" />,
      cantidad: 3,
      titulo: "Ticket Total",
      dia: "Hoy",
    },
    {
      icon: <TicketIcon className="h-5" />,
      cantidad: 3,
      titulo: "Ticket Total",
      dia: "Hoy",
    },
    {
      icon: <TicketIcon className="h-5" />,
      cantidad: 3,
      titulo: "Ticket Total",
      dia: "Hoy",
    },
  ];
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-4 gap-4">
          {data.map((item, index) => (
            <CardinfoComponent
              key={index}
              icon={item.icon}
              cantidad={item.cantidad}
              titulo={item.titulo}
              dia={item.dia}
            />
          ))}
        </div>
        <div className="grid grid-cols-4 gap-4">
          {data1.map((item, index) => (
            <CardinfoComponent
              key={index}
              icon={item.icon}
              cantidad={item.cantidad}
              titulo={item.titulo}
              dia={item.dia}
            />
          ))}
        </div>
      </div>
    </>
  );
}
