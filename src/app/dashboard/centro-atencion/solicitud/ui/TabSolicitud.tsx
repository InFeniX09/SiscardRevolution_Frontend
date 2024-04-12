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
  const [datatodossolicitud, setDataTodosSolicitud] = useState([]);
  const [datatodosticket, setDataTodosTicket] = useState([]);

  const [selectedTab, setSelectedTab] = useState(0); // Estado para el índice de la pestaña seleccionada

  useEffect(() => {
    socket?.emit("listar-tiposolicitud", null, (tiposolicitud: any) => {
      setTipoSolicitud(tiposolicitud);
    });
  }, []);

  useEffect(() => {
    if (session) { // Verifica si session está definido
      const quesada = session.user.IdUsuario;
  
      const data = {
        Usuario_id: quesada,
      };
 
  
      socket?.emit("listar-misolicitud", data, (asignados: any) => {
        setSolicitud(asignados);
      });
    }
  }, [session, socket]);

  const handleTabChange = (key: any) => {
    setSelectedTab(key);
    switch (Number(key)) {
      case 1:
        break;
      case 2:
        if (dataticket.length === 0) {
          const data = {
            Usuario_id: session?.user.IdUsuario,
          };
          socket?.emit("listar-miticket", data, (ticket: any) => {
            setDataTicket(ticket);
          });
        } else {
        }
        break;
      case 3:
        if (datatodossolicitud.length === 0) {
          const data = {
            Usuario_id: undefined
          };
          socket?.emit("listar-solicitud", data, (solicitudtodos: any) => {
            setDataTodosSolicitud(solicitudtodos);
          });
        } else {
        }
        break;
      case 4:
        if (datatodosticket.length === 0) {
          const data = {
            Usuario_id: undefined,
          };
          socket?.emit("listar-ticket", data, (ticket: any) => {
            setDataTodosTicket(ticket);
          });
        } else {
        }
        break;
    }
  };
  return (
    <div className="flex w-full flex-col">
      <Tabs
        color="danger"
        aria-label="Options"
        selectedKey={selectedTab}
        onSelectionChange={handleTabChange}
      >
        <Tab key="1" title="Mis Solicitudes">
          <Card>
            <CardBody>
              <TableSolicitudComponent userData={userData} />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="2" title="Mis Tickets">
          <Card>
            <CardBody>
              <TableTicketComponent DataTicket={dataticket} />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="3" title="Atender Solicitudes">
          <Card>
            <CardBody>
              <TableSolicitudComponent userData={datatodossolicitud} />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="4" title="Atender Tickets">
          <Card>
            <CardBody>
              <TableTicketComponent DataTicket={datatodosticket} />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="5" title="Nueva">
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
