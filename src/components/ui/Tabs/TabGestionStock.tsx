"use client";
import React, { useContext, useEffect, useState } from "react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import { SocketContext } from "@/src/context/SocketContext";
import { useSession } from "next-auth/react";
import TableEquipoStockComponent from "../Table/TableEquipoStock";
import TableEquipoControlComponent from "../Table/TablaEquipoControl";

export default function TabGestionStock() {
  const { socket } = useContext(SocketContext);
  const { data: session } = useSession();
  const [selectedTab, setSelectedTab] = useState(0); // Estado para el índice de la pestaña seleccionada
  const [dataequipostock, setEquipoStock] = useState([]);
  const [dataequipocontrol, setEquipoControl] = useState([]);

  useEffect(() => {
    if (session) {
      socket?.emit("listar-equipostock", "", (TipoEquipo: any) => {
        setEquipoStock(TipoEquipo);
      });
    }
  }, [session, socket]);
  const handleTabChange = (key: any) => {
    setSelectedTab(key);
    switch (Number(key)) {
      case 1:
        break;
      case 2:
        if (dataequipocontrol.length === 0) {
          socket?.emit("listar-equipocontrol", "", (EquipoControl: any) => {
            setEquipoControl(EquipoControl);
          });
        } else {
        }
        break;
      
    }
  };
  return (
    <div className="flex w-full flex-col">
      <Tabs
        disabledKeys={["music"]}
        aria-label="Disabled Options"
        selectedKey={selectedTab}
        onSelectionChange={handleTabChange}
      >
        <Tab key="1" title="EquipoStock">
          <Card>
            <CardBody>
              <TableEquipoStockComponent array={dataequipostock} />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="2" title="EquipoControl">
          <Card>
            <CardBody>
              <TableEquipoControlComponent array={dataequipocontrol}/>
            </CardBody>
          </Card>
        </Tab>
        
      </Tabs>
    </div>
  );
}