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
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function TabCrearGestionEntidad() {
  //-------------------------
  //Socket y Session
  //-------------------------
  const { socket } = useContext(SocketContext);
  const { data: session } = useSession();
  //-------------------------
  //Variables de Estado
  //-------------------------
  const [empleadosinusuario, setEmpleadoSinUsuario] = useState<any>([]);

  const [tipodocumento, setTipoDocumento] = useState<any>([]);
  const [area, setArea] = useState<any>([]);
  const [puesto, setPuesto] = useState<any>([]);
  const [selectArea, setSelectArea] = useState<any>([]);
  const [selectedTab, setSelectedTab] = React.useState<string | number>("1");

  //-------------------------
  //UseEffect
  //-------------------------
  useEffect(() => {
    socket?.emit("listar-empleadosinusuario", "", (empleadosinusuario: any) => {
      setEmpleadoSinUsuario(empleadosinusuario);
      console.log(empleadosinusuario);
    });
  }, []);

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
  const {
    register: rCrearUsuario,
    handleSubmit: fCrearUsuario,
    watch,
    reset: resetCrearUsuario,
  } = useForm();

  const actionCrearUsuario = async (dato: any) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Crear nuevo Usuario?",
      text: "Se creará un nuevo Usuario.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, proceder!",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        socket?.emit(
          "crear-usuario",
          {
            Usuario: dato.Usuario,
            Clave: dato.Clave,
            Entidad: dato.Entidad,
         
          },
          (usuario: any) => {
            if (usuario.msg === "Existe") {
              Swal.fire({
                title: "Creación sin Exito!",
                text: "El Usuario ya existe, intente con otros datos.",
                icon: "error",
              });
            } else {
              resetCrearUsuario();
              Swal.fire({
                title: "Creación Exitosa!",
                text: "Se ha creado un nuevo Usuario.",
                icon: "success",
              });
            }
          }
        );
      }
    });
  };

  const [usuarioautocreado, setUsuarioAutoCreado] = useState("");

  const ganster = watch("Entidad");

  useEffect(() => {
    const entidadSeleccionada = empleadosinusuario.find(
      (item: any) => item.IdEntidad === Number(ganster)
    );
    if (entidadSeleccionada) {
      const primerNombre = entidadSeleccionada.Nombres.split(" ")[0] || "";
      const primerApellido = entidadSeleccionada.Apellidos.split(" ")[0] || "";
      setUsuarioAutoCreado(
        `${primerNombre.charAt(
          0
        )}${primerApellido}`.toLowerCase()
      );
    }
  }, [ganster, empleadosinusuario]);

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
                <SelectNormalComponent
                  array={empleadosinusuario}
                  value="IdEntidad"
                  texts={["Nombres", "Apellidos"]}
                  label="Entidad"
                  placeholder="Seleccione una entidad"
                  prop={{ ...rCrearUsuario("Entidad") }}
                />
                <InputComponent
                  tipo="text"
                  titulo="Usuario"
                  placeholder=""
                  icon
                  icon1={"hidden"}
                  prop={{
                    ...rCrearUsuario(`Usuario`),
                    value: usuarioautocreado,
                  }}
                />
                <InputComponent
                  tipo="text"
                  titulo="Clave"
                  placeholder=""
                  icon
                  icon1={"hidden"}
                  prop={{
                    ...rCrearUsuario(`Clave`),
                    value: "Siscard678",
                  }}
                />
                <Button
                  type="button"
                  onClick={fCrearUsuario(actionCrearUsuario)}
                  color="danger"
                >
                  Finalizar
                </Button>
              </form>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
