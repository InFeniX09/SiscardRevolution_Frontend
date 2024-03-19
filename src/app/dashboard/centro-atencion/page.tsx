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

export default async function page() {
 /* interface Option {
    name: string;
    digit: number;
  }

  const today = new Date();
  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const currentDayIndex = today.getDay(); // Índice del día actual
  const previousDays: Option[] = [];

  // Generar las opciones de los días anteriores
  for (let i = 0; i < 7; i++) {
    const dayIndex = (currentDayIndex - i + 7) % 7; // Calcula el índice del día anterior
    const dayName =
      i === 0
        ? "Hoy"
        : i === 1
        ? "Ayer"
        : i === 2
        ? "Anteayer"
        : `${days[dayIndex]} ${today.getDate() - i + 1}`;
    previousDays.push({ name: dayName, digit: i });
  }

  console.log(previousDays);*/

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
    </>
  );
}
