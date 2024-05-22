"use client";
import { Button, Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "@/src/context/SocketContext";
import TableUsuario from "../Table/TableUsuario";
import SelectStateComponent from "../Select/SelectState";
import SelectNormalComponent from "../Select/SelectNormal";
import { useForm } from "react-hook-form";

export default function TabReportes() {
  const { socket } = useContext(SocketContext);
  const [reporte, setReporte] = useState([]);

  useEffect(() => {
    socket?.emit("listar-reporte", "", (reporte: any) => {
      console.log(reporte);
      setReporte(reporte);
    });
  }, []);

  const { register: rReporte, handleSubmit: fReporte } = useForm();
  const actionReporte = async (dato: any) => {
    socket?.emit("generar-excelreporte", dato, (reporte: any) => {
      console.log(reporte);
      const blob = new Blob(
        [
          new Uint8Array(
            atob(reporte.buffer)
              .split("")
              .map((char) => char.charCodeAt(0))
          ),
        ],
        {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }
      );

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reporte.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  };
  return (
    <>
      <div className="flex w-full flex-col">
        <Tabs
          className=""
          color="danger"
          classNames={{
            cursor: "bg-[var(--colorblur-peru)]",
            tabList: "bg-white",
          }}
          aria-label="Options"
        >
          <Tab key="1" title="SQL" className="text-white">
            <Card>
              <CardBody className="flex gap-4">
                <form className="flex flex-col gap-4">
                  <SelectNormalComponent
                    array={reporte}
                    value="IdReporte"
                    texts={["Reporte"]}
                    label="Reportes"
                    placeholder="Seleccionar"
                    prop={{ ...rReporte(`Reporte`) }}
                  />
                  <Button
                    type="button"
                    onClick={fReporte(actionReporte)}
                    color="primary"
                  >
                    Descargar Excel
                  </Button>
                </form>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="2" title="PowerBi">
            <Card>
              <CardBody className="flex gap-4"></CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
