"use client";
import React, { useContext, useEffect, useState } from "react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import TableTipoEquipoComponent from "@/src/components/ui/Table/TableTipoEquipo";
import { SocketContext } from "@/src/context/SocketContext";
import { useSession } from "next-auth/react";
import TableMarcaComponent from "../Table/TableMarca";
import TableModeloComponent from "../Table/TableModelo";
import TableEquipoStockComponent from "../Table/TableEquipoStock";

export default function TabGestionStock() {
  const { socket } = useContext(SocketContext);
  const { data: session } = useSession();
  const [selectedTab, setSelectedTab] = useState(0); // Estado para el índice de la pestaña seleccionada
  const [dataequipostock, setEquipoStock] = useState([]);
  const [datamarca, setMarca] = useState([]);
  const [datamodelo, setModelo] = useState([]);
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
        if (datamarca.length === 0) {
          socket?.emit("listar-marca", "", (Marca: any) => {
            setMarca(Marca);
          });
        } else {
        }
        break;
      case 3:
        if (datamodelo.length === 0) {
          socket?.emit("listar-modelo", "", (Modelo: any) => {
            setModelo(Modelo);
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
        <Tab key="1" title="TipoEquipo">
          <Card>
            <CardBody>
              <TableEquipoStockComponent array={dataequipostock} />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="2" title="Marca">
          <Card>
            <CardBody>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="3" title="Modelo">
          <Card>
            <CardBody>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
