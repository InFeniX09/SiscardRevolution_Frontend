"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Select,
  SelectItem,
  Button,
  Input,
} from "@nextui-org/react";
import { DatePicker } from "@nextui-org/react";

import { SocketContext } from "@/src/context/SocketContext";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputComponent from "../Input/Input";
import { useFieldArray, useForm } from "react-hook-form";
import SelectNormalComponent from "../Select/SelectNormal";
import TextAreaNormalComponent from "../Textarea/TextAreaNormal";
import { TicketIcon } from "@heroicons/react/24/solid";
export default function TabConfiguracion() {
  const { socket } = useContext(SocketContext);
  const { data: session } = useSession();
  const [selectedTab, setSelectedTab] = useState(0); // Estado para el índice de la pestaña seleccionada
  const [tipodocumento, setTipoDocumento] = useState<any>([]);
  const [btnguardar, setBtnGuardar] = useState<any>(true);

  useEffect(() => {
    toast.error("Selecciona una de las opciones para empezar", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });
  }, [session]);

  const handleTabChange = (key: any) => {
    setSelectedTab(key);
    switch (Number(key)) {
    }
  };
  //-------------------------
  //Formulario
  //-------------------------

  const { register: rDatosPersonales, handleSubmit: fDatosPersonales } =
    useForm();
  const actionDatosPersonales = async (dato: any) => {
    socket?.emit("crear-datospersonales", dato, (marca: any) => {
      console.log("blon", marca);
    });
  };
  //-------------------------
  //UseEffect
  //-------------------------
  useEffect(() => {
    socket?.emit("listar-tipodocumento", null, (tipodocumento: any) => {
      setTipoDocumento(tipodocumento);
    });
  }, []);

  //-------------------------
  return (
    <div className="flex w-full flex-col">
      <Tabs
        disabledKeys={["music"]}
        selectedKey={selectedTab}
        onSelectionChange={handleTabChange}
      >
        <Tab key="1" title="Datos Personales">
          <Card>
            <CardBody>
              <form className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <Input
                    autoFocus
                    endContent={
                      <TicketIcon className="h-5 text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Nombres"
                    placeholder="Ingresar Nombres"
                    labelPlacement="outside"
                    variant="bordered"
                    {...rDatosPersonales("Asunto", { required: true })}
                  />
                  <Input
                    autoFocus
                    endContent={
                      <TicketIcon className="h-5 text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Apellidos"
                    placeholder="Ingresar Apellidos"
                    labelPlacement="outside"
                    variant="bordered"
                    {...rDatosPersonales("Asunto", { required: true })}
                  />
                </div>
                <div className="flex gap-3">
                  <div className="flex ">
                    <SelectNormalComponent
                      array={tipodocumento}
                      value="IdTipoDocumento"
                      texts={["TipoDocumento"]}
                      label="Tipo Documento"
                      placeholder="Seleccione un Modelo"
                      prop={{ ...rDatosPersonales("Modelo") }}
                    />
                    <Input
                      autoFocus
                      endContent={
                        <TicketIcon className="h-5 text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="NroDocumento"
                      placeholder="Ingresar Nombres"
                      labelPlacement="outside"
                      variant="bordered"
                      {...rDatosPersonales("Asunto", { required: true })}
                    />
                  </div>
                  <Input
                    autoFocus
                    endContent={
                      <TicketIcon className="h-5 text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Telefono"
                    placeholder="Ingresar Nombres"
                    labelPlacement="outside"
                    variant="bordered"
                    {...rDatosPersonales("Asunto", { required: true })}
                  />
                </div>
                <div className="flex gap-3">
                  <Input
                    autoFocus
                    endContent={
                      <TicketIcon className="h-5 text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Correo"
                    placeholder="Ingresar Nombres"
                    labelPlacement="outside"
                    variant="bordered"
                    {...rDatosPersonales("Asunto", { required: true })}
                  />
                  <Input
                    autoFocus
                    endContent={
                      <TicketIcon className="h-5 text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Dirección"
                    placeholder="Ingresar Apellidos"
                    labelPlacement="outside"
                    variant="bordered"
                    {...rDatosPersonales("Asunto", { required: true })}
                  />
                </div>
                <div>
                  <DatePicker
                    label="Fecha Nacimiento"
                    className="max-w-[284px]"
                  />
                </div>
               
                <Button
                  type="button"
                  onClick={fDatosPersonales(actionDatosPersonales)}
                  color="primary"
                >
                  Guardar
                </Button>
              </form>
            </CardBody>
          </Card>
        </Tab>
       
      </Tabs>
    </div>
  );
}
