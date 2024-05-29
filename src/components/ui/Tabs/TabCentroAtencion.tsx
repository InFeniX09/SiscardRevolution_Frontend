"use client";
import React, { useContext, useEffect, useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { SocketContext } from "@/src/context/SocketContext";
import TableTicketComponent from "@/src/components/ui/Table/TableTicket";
import TableSolicitudComponent from "@/src/components/ui/Table/TableSolicitud";
import { useSession } from "next-auth/react";
import { Menu } from "@/src/interfaces";
import Loading from "../Loading/Loading";

export default function TabCentroAtencion() {
  const { socket } = useContext(SocketContext);
  const { data: session, status } = useSession();
  const [datasolicitud, setSolicitud] = useState([]);
  const [dataticket, setDataTicket] = useState([]);
  const [datatodossolicitud, setDataTodosSolicitud] = useState([]);
  const [datatodosticket, setDataTodosTicket] = useState([]);
  const [menuItems, setMenuItems] = useState<Menu[]>([]);
  const [menuLoaded, setMenuLoaded] = useState(false); // Estado para indicar si los datos del menú están cargados

  const [selectedTab, setSelectedTab] = useState(0); // Estado para el índice de la pestaña seleccionada

  useEffect(() => {
    if (session) {
      // Verifica si session está definido
      const quesada = session.user.IdUsuario;

      const data = {
        Usuario_id: quesada,
      };

      socket?.emit("listar-misolicitud", data, (asignados: any) => {
        setSolicitud(asignados);
      });
    }
  }, [session, socket]);

  useEffect(() => {
    if (status === "authenticated") {
      try {
        const dato = {
          Usuario_id: session?.user.IdUsuario,
          Puesto_id: session?.user.Puesto_id,
        };
        socket?.emit(
          "listar-menuxusuarioxperfil",
          dato,
          (menuxusuario: any) => {
            setMenuItems(menuxusuario);
            setMenuLoaded(true);
          }
        );
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    }
  }, [status]);

  const handleTabChange = (key: any) => {
    setSelectedTab(key.toString());
    switch (Number(key)) {
      case 1:
        console.log(menuItems);
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
            Usuario_id: undefined,
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
  const tabs = [
    <Tab key="1" title="Mis Solicitudes">
      <Card>
        <CardBody>
          <TableSolicitudComponent array={datasolicitud} atender="si"/>
        </CardBody>
      </Card>
    </Tab>,
    <Tab key="2" title="Mis Tickets">
      <Card>
        <CardBody>
          <TableTicketComponent array={dataticket} atender="si" />
        </CardBody>
      </Card>
    </Tab>,
  ];
  if (menuItems.some((item) => item.IdMenu === 7 )) {
    tabs.push(
      <Tab key="3" title="Atender Solicitudes">
        <Card>
          <CardBody>
            <TableSolicitudComponent array={datatodossolicitud} atender=""/>
          </CardBody>
        </Card>
      </Tab>,
      <Tab key="4" title="Atender Tickets">
        <Card>
          <CardBody>
            <TableTicketComponent array={datatodosticket} atender=""/>
          </CardBody>
        </Card>
      </Tab>
    );
  }

  return (
    <div className="flex w-full flex-col">
     {menuLoaded ? (
        <Tabs
          color="danger"
          aria-label="Options"
          selectedKey={selectedTab}
          onSelectionChange={handleTabChange}
        >
          {tabs}
        </Tabs>
      ) : (
       <Loading/>
      )}
    </div>
  );
}
