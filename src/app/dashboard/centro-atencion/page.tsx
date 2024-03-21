"use client";
import React from "react";
import {
  TicketIcon,
  ClipboardDocumentCheckIcon,
  DocumentIcon,
} from "@heroicons/react/24/solid";
import CardinfoComponent from "./ui/Cardinfo";
import { getlistarTicketEstadoxFecha } from "@/src/actions/auth/centro-atencion";
import SelectComponent from "@/src/components/ui/Select/Select";
import CardComponent from "@/src/components/ui/Card/Card";
import CardBlurComponent from "./ui/CardBlur";
import CardOptionComponent from "@/src/components/ui/Card/CardOption";

export default async function page() {
  <></>;
  /*
 
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
  */
  /*

      <div className="flex flex-col gap-2 text-[0.8rem]">
       
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
        <div className="py-4 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <CardComponent title="Crear Ticket" text="Crea un ticket en el cual puedas personalizar tu problema" link="#"/>
          <CardComponent title="Crear Solicitud" text="Crea una solicitud con un formato preestablecid para dar solucion a tu problema" link="#"/>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <CardComponent title="Historial Ticket" text="Revisa el historial de los tickets creados/asignados" link="/dashboard/centro-atencion/ticket"/>
          <CardComponent title="Historial Solicitud" text="Revisa el historial de las solicitudes creadas/asignadas" link="/dashboard/centro-atencion/solicitud"/>
        </div>
        </div>
       
      </div>
 */
  return (
    <>
    <div className="flex gap-2 flex-col">
        <CardOptionComponent href="centro-atencion/ticket" src="/ilustraciones/ilu1r.png" title="Ticket" label="Generación de ticket, problemas personalizados, registro de actividades"/>
        <CardOptionComponent href="centro-atencion/solicitud" src="/ilustraciones/ilu2r.png" title="Solicitud" label="Generación de solicitud, problemas preestablecidos, registro de solicitudes"/>

    </div>
      
    </>
  );
}
