import React from "react";
import {
  TicketIcon,
  ClipboardDocumentCheckIcon,
  DocumentIcon,
} from "@heroicons/react/24/solid";
import CardinfoComponent from "./ui/Cardinfo";
import { getlistarTicketEstadoxFecha } from "@/src/actions/auth/centro-atencion";

export default async function page() {
  interface prop {
    Dia: string;
    Titulo: string;
    cantidad: number;
  }
  const datar: prop[] = await getlistarTicketEstadoxFecha(0);

  const data1 = [
    {
      icon: <TicketIcon className="h-5" />,
      cantidad: 3,
      titulo: "Solicitud Nueva",
      dia: "Hoy",
    },
    {
      icon: <TicketIcon className="h-5" />,
      cantidad: 3,
      titulo: "Solicitud Pendiente",
      dia: "Hoy",
    },
    {
      icon: <TicketIcon className="h-5" />,
      cantidad: 3,
      titulo: "Solicitud En Proceso",
      dia: "Hoy",
    },
    {
      icon: <TicketIcon className="h-5" />,
      cantidad: 3,
      titulo: "Solicitud Cerrada",
      dia: "Hoy",
    },
  ];
  return (
    <>
      <div className="flex flex-col gap-2 text-[0.8rem]">
        <div className="grid grid-cols-4 gap-4">
          {datar.map((item, index) => (
            <CardinfoComponent
              key={index}
              icon={<TicketIcon className="h-5" />}
              cantidad={item.cantidad}
              titulo={item.Titulo}
              dia={item.Dia}
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
