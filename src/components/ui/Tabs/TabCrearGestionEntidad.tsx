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
  DatePicker,
  CalendarDate,
  DateInput,
} from "@nextui-org/react";
import { SocketContext } from "@/src/context/SocketContext";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputComponent from "../Input/Input";
import { useFieldArray, useForm } from "react-hook-form";
import SelectNormalComponent from "../Select/SelectNormal";
import TextAreaNormalComponent from "../Textarea/TextAreaNormal";
import { TicketIcon } from "@heroicons/react/24/solid";
import Input1Component from "../Input/Input1";
import SelectComponent from "../Select/Select";
import SelectStateComponent from "../Select/SelectState";

export default function TabCrearGestionEntidad() {
  //-------------------------
  //Socket y Session
  //-------------------------
  const { socket } = useContext(SocketContext);
  const { data: session } = useSession();
  //-------------------------
  //Variables de Estado
  //-------------------------
  const [tipodocumento, setTipoDocumento] = useState<any>([]);
  const [area, setArea] = useState<any>([]);
  const [puesto, setPuesto] = useState<any>([]);
  const [selectArea, setSelectArea] = useState<any>([]);
  const [selectedTab, setSelectedTab] = React.useState<string | number>("1");

  const [equipo, setEquipo] = useState<any>([]);
  const [tipoequipo, setTipoEquipo] = useState<any>([]);
  const [cliente, setCliente] = useState<any>([]);
  const [marca, setMarca] = useState<any>([]);
  const [modelo, setModelo] = useState<any>([]);
  const [btnguardar, setBtnGuardar] = useState<any>(true);
  //-------------------------
  //UseEffect
  //-------------------------
  useEffect(() => {
    toast.error("Selecciona una de las opciones para empezar", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });
    if (session) {
      socket?.emit("listar-tipoequipo", "", (TipoEquipo: any) => {
        setTipoEquipo(TipoEquipo);
      });
    }
  }, [session]);

  useEffect(() => {
    socket?.emit("listar-tipodocumento", null, (tipodocumento: any) => {
      setTipoDocumento(tipodocumento);
    });
    socket?.emit("listar-area", null, (area: any) => {
      setArea(area);
    });
  }, []);

  useEffect(() => {
    socket?.emit("listar-puesto", { Area: selectArea }, (puesto: any) => {
      setPuesto(puesto);
    });
  }, [selectArea]);

 const handleTabChange = (key: any) => {
    setSelectedTab(key);
    switch (Number(key)) {
      
    }
  };

  //-------------------------
  //Formularios
  //-------------------------

  const { register: rEntidad, handleSubmit: fEntidad, watch } = useForm();
  
  const actionEntidad = async (dato: any) => {
    const formValues = watch();
    console.log(formValues);
    console.log(dato);
  };



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
              <form className="flex justify-center items-center flex-col w-full gap-3">
                <div className="flex gap-3  w-full">
                  <InputComponent
                    tipo="text"
                    titulo="Nombres"
                    placeholder=""
                    icon
                    icon1={"hidden"}
                    prop={{ ...rEntidad(`Nombres`) }}
                  />
                  <InputComponent
                    tipo="text"
                    titulo="Apellidos"
                    placeholder=""
                    icon
                    icon1={"hidden"}
                    prop={{ ...rEntidad(`Apellidos`) }}
                  />
                </div>
                <div className="flex gap-3  w-full">
                  <SelectNormalComponent
                    array={tipodocumento}
                    value="IdTipoDocumento"
                    texts={["TipoDocumento"]}
                    label="Tipo Documento"
                    placeholder="Seleccione un Modelo"
                    prop={{ ...rEntidad("TipoDocumento") }}
                  />

                  <InputComponent
                    tipo="text"
                    titulo="Nro Documento"
                    placeholder=""
                    icon
                    icon1={"hidden"}
                    prop={{ ...rEntidad("NroDocumento") }}
                  />
                </div>
                <div className="flex gap-3  w-full">
                  <InputComponent
                    tipo="text"
                    titulo="Telefono"
                    placeholder=""
                    icon
                    icon1={"hidden"}
                    prop={{ ...rEntidad(`Telefono`) }}
                  />
                  <InputComponent
                    tipo="text"
                    titulo="Direccion"
                    placeholder=""
                    icon
                    icon1={"hidden"}
                    prop={{ ...rEntidad(`Direccion`) }}
                  />
                </div>
                <div className="flex gap-3  w-full">
                  <InputComponent
                    tipo="text"
                    titulo="Correo"
                    placeholder=""
                    icon
                    icon1={"hidden"}
                    prop={{ ...rEntidad(`Correo`) }}
                  />
                  <InputComponent
                    tipo="date"
                    titulo="Fecha de Nacimiento"
                    placeholder=""
                    icon
                    icon1={"hidden"}
                    prop={{ ...rEntidad(`Fecha`) }}
                  />
                </div>
                <div className="flex gap-3  w-full">
                  <SelectNormalComponent
                    array={[
                      { IdSexo: "masculino", Sexo: "Masculino" },
                      { IdSexo: "femenino", Sexo: "Femenino" },
                    ]}
                    value="IdSexo"
                    texts={["Sexo"]}
                    label="Genero"
                    placeholder="Seleccionar un cliente"
                    prop={{ ...rEntidad("Genero") }}
                  />
                </div>
                <div className="flex gap-3  w-full">
                  <SelectStateComponent
                    array={area}
                    index="IdArea"
                    texts={["Area"]}
                    label="Area"
                    placeholder="Seleccione un Area"
                    value={selectArea}
                    onChange={setSelectArea}
                  />
                  <SelectNormalComponent
                    array={puesto}
                    value="IdPuesto"
                    texts={["Puesto"]}
                    label="Puesto"
                    placeholder="Seleccione un Puesto"
                    prop={{ ...rEntidad("Puesto") }}
                  />
                </div>
                <Button
                  type="button"
                  onClick={() => handleTabChange("2")}
                  color="primary"
                >
                  next
                </Button>
                <Button
                  type="button"
                  onClick={fEntidad(actionEntidad)}
                  color="primary"
                >
                  Siguiente
                </Button>
              </form>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="2" title="Datos Usuario">
          <Card>
            <CardBody>
              <form>
                <div className="flex gap-3  w-full">
                  <InputComponent
                    tipo="text"
                    titulo="Usuario"
                    placeholder=""
                    icon
                    icon1={"hidden"}
                    prop={{ ...rEntidad(`Usuario`) }}
                  />
                  <InputComponent
                    tipo="text"
                    titulo="Clave"
                    placeholder=""
                    icon
                    icon1={"hidden"}
                    prop={{ ...rEntidad(`Clave`) }}
                  />
                </div>
                <Button
                  type="button"
                  onClick={fEntidad(actionEntidad)}
                  color="primary"
                >
                  Siguiente
                </Button>
              </form>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
