import { getlistarTicketEstadoxFecha } from "@/src/actions/auth/centro-atencion";
import TableTicketComponent from "@/src/components/ui/Table/table-ticket";
import CardinfoComponent from "../ui/Cardinfo";
import { TicketIcon } from "@heroicons/react/24/solid";
import SelectComponent from "@/src/components/ui/Select/Select";
import TableComponent from "@/src/components/ui/Table/Table";
import {
  columnslistarTicket,
  getlistarTicket,
} from "@/src/actions/auth/buscar-usuario";
import ModalTicketComponent from "@/src/components/ui/Modal/ModalTicket";

export default async function Page() {
  interface Option {
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
        : `${days[dayIndex]} ${today.getDate() - i}`;
    previousDays.push({ name: dayName, digit: i });
  }

  interface prop {
    Dia: string;
    Titulo: string;
    cantidad: number;
  }

  const datar: prop[] = await getlistarTicketEstadoxFecha(0);
  const users1 = await getlistarTicket();

  return (
    <>
      <div className="flex justify-between items-center">
        <ModalTicketComponent />
      </div>
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
      <TableComponent
        columns={columnslistarTicket}
        users={users1}
        rowKey="IdTicket"
      />
    </>
  );
}
