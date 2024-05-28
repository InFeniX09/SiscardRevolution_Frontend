"use client";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "@/src/context/SocketContext";
import TableUsuario from "../Table/TableUsuario";

export default function TabGestionEntidad() {
  const { socket } = useContext(SocketContext);
  const [usuario, setUsuario] = useState([]);

  useEffect(() => {
    socket?.emit("listar-usuario", "", (usuario: any) => {
      console.log(usuario);
      setUsuario(usuario);
    });
  }, []);

  return (
    <>
      <div className="flex w-full flex-col">
        <Tabs
          className=""
          color="danger"
          classNames={{
            cursor: "bg-[var(--color-peru)]",
            tabList: "bg-white",
          }}
          aria-label="Options"
        >
          <Tab key="1" title="Usuario" className="text-white">
            <Card>
              <CardBody className="flex gap-4">
                <TableUsuario array={usuario} />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
