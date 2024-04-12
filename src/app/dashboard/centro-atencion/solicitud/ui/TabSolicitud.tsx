"use client";
import React, { useContext, useEffect, useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import FormSolicitud from "./FormSolicitud";
import { SocketContext } from "@/src/context/SocketContext";
import TableTicketComponent from "@/src/components/ui/Table/TableTicket";
import TableUsuarioComponent from "@/src/components/ui/Table/TableUsuario";
import TableSolicitudComponent from "@/src/components/ui/Table/TableSolicitud";
import { useSession } from "next-auth/react";

export default function TabSolicitud() {
  const { socket } = useContext(SocketContext);
  const [tiposolicitud, setTipoSolicitud] = useState<any>([]);
  const { data: session } = useSession();
  const [userData, setSolicitud] = useState([]);
  const [dataticket, setDataTicket] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0); // Estado para el índice de la pestaña seleccionada

  useEffect(() => {
    socket?.emit("listar-tiposolicitud", null, (tiposolicitud: any) => {
      console.log(tiposolicitud);
      setTipoSolicitud(tiposolicitud);
    });
    
  }, []);

  const listarticket=()=>{
    console.log("especie")
    socket?.emit("listar-ticket", null, (ticket: any) => {
      console.log('importa',tiposolicitud);
      setDataTicket(ticket);
    });
  }

  useEffect(() => {
    const data = {
      Usuario_id: session?.user.IdUsuario,
    };
    socket?.emit("listar-misolicitud", data, (asignados: any) => {
      console.log(asignados);
      setSolicitud(asignados);
    });
  }, [socket]);

  const handleTabChange = (key:any) => {
    setSelectedTab(key);
    if (key == 2 && dataticket.length === 0) {
      console.log("Cargar datos para la segunda pestaña aquí");
      socket?.emit("listar-ticket", null, (ticket: any) => {
        console.log('importa',tiposolicitud);
        setDataTicket(ticket);
      });
    }
  };
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options" selectedKey={selectedTab} onSelectionChange={handleTabChange}>
        <Tab key="1" title="Mis Solicitudes">
          <Card>
            <CardBody>
              <TableSolicitudComponent userData={userData}/>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="2" title="Mis Tickets">
          <Card>
            <CardBody>
              <TableTicketComponent DataTicket={dataticket}/>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="3" title="Nueva">
          <Card>
            <CardBody>
              <FormSolicitud tiposolicitud={tiposolicitud} />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
