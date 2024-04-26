"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
  Button,
} from "@nextui-org/react";
import TableTipoEquipoComponent from "@/src/components/ui/Table/TableTipoEquipo";
import { SocketContext } from "@/src/context/SocketContext";
import { useSession } from "next-auth/react";
import TableMarcaComponent from "../Table/TableMarca";
import TableModeloComponent from "../Table/TableModelo";
import TableEquipoComponent from "../Table/TableEquipo";
import TableEquipoDescuentoComponent from "../Table/TableEquipoDescuento";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputComponent from "../Input/Input";
import { useForm } from "react-hook-form";
import SelectNormalComponent from "../Select/SelectNormal";
import SelectStateComponent from "../Select/SelectState";
import SelectComponent from "../Select/Select";
export default function TabCrearEquipo() {
  const { socket } = useContext(SocketContext);
  const { data: session } = useSession();
  const [selectedTab, setSelectedTab] = useState(0); // Estado para el índice de la pestaña seleccionada

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

  const handleTabChange = (key: any) => {
    setSelectedTab(key);
    switch (Number(key)) {
      
    }
  };

  const { register: rTipoEquipo, handleSubmit: fTipoEquipo } = useForm();
  const actionTipoEquipo = async (dato: any) => {
    socket?.emit("crear-tipoequipo", dato, (marca: any) => {
      console.log("blon", marca);
    });
  };
  const { register: rMarca, handleSubmit: fMarca } = useForm();
  const actionMarca = async (dato: any) => {
    socket?.emit("crear-marca", dato, (marca: any) => {
      console.log("blon", marca);
    });
  };
  const { register: rModelo, handleSubmit: fModelo } = useForm();
  const actionModelo = async (dato: any) => {
    socket?.emit("crear-modelo", dato, (marca: any) => {
      console.log("blon", marca);
    });
  };

  const [tipoequipo, setTipoEquipo] = useState<any>([]);
  const [cliente, setCliente] = useState<any>([]);
  const [marca, setMarca] = useState<any>([]);
  const [modelo, setModelo] = useState<any>([]);

  /*UseEffect*/
  useEffect(() => {
    socket?.emit("listar-tipoequipo", null, (tipoequipo: any) => {
      setTipoEquipo(tipoequipo);
    });
    socket?.emit("listar-cliente", null, (cliente: any) => {
      setCliente(cliente);
    });
    socket?.emit("listar-MarcaxTipoEquipo", null, (marca: any) => {
      setMarca(marca);
      console.log("blon", marca);
    });
  }, []);
  return (
    <div className="flex w-full flex-col">
      <Tabs
        disabledKeys={["music"]}
        selectedKey={selectedTab}
        onSelectionChange={handleTabChange}
      >
        <Tab key="1" title="TipoEquipo">
          <Card>
            <CardBody>
              <form className="flex justify-center items-center flex-col w-full gap-3">
                <InputComponent
                  tipo="text"
                  titulo="Nuevo Tipo de Equipo"
                  placeholder=""
                  icon
                  icon1={"hidden"}
                  prop={{ ...rTipoEquipo(`TipoEquipo`) }}
                />
                <Select
                  label="Clasificacion"
                  className="w-full"
                  labelPlacement="outside"
                  placeholder="Seleccionar"
                  {...rTipoEquipo(`Clasificacion`)}
                >
                  <SelectItem key={"Seriado"} value="Seriado">
                    Seriado
                  </SelectItem>
                  <SelectItem key={"Consumible"} value="Consumible">
                    Consumible
                  </SelectItem>
                  <SelectItem key={"Sustituible"} value="Sustituible">
                    Sustituible
                  </SelectItem>
                  <SelectItem key={"Accesorio"} value="Accesorio">
                    Accesorio
                  </SelectItem>
                </Select>
                <Button color="danger" onClick={fTipoEquipo(actionTipoEquipo)}>
                  Añadir
                </Button>
              </form>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="2" title="Marca">
          <Card>
            <CardBody>
              <form className="flex justify-center items-center flex-col w-full gap-3">
                <InputComponent
                  tipo="text"
                  titulo="Nueva Marca"
                  placeholder=""
                  icon
                  icon1={"hidden"}
                  prop={{ ...rMarca(`Marca`) }}
                />
                <Button color="danger" onClick={fMarca(actionMarca)}>
                  Añadir
                </Button>
              </form>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="3" title="Modelo">
          <Card>
            <CardBody>
              <form className="flex justify-center items-center flex-col w-full gap-3">
                <InputComponent
                  tipo="text"
                  titulo="Nuevo Modelo"
                  placeholder=""
                  icon
                  icon1={"hidden"}
                  prop={{ ...rModelo(`Modelo`) }}
                />
                <Button color="danger" onClick={fModelo(actionModelo)}>
                  Añadir
                </Button>
              </form>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="4" title="Equipo">
          <Card>
            <CardBody>
              <form className="flex justify-center items-center flex-col w-full gap-3">
                <SelectNormalComponent
                  array={cliente}
                  value="IdCliente"
                  texts={["CodCliente"]}
                  label="Cliente"
                  placeholder="Seleccionar un cliente"
                  prop={{}}
                />
                <SelectStateComponent
                  array={tipoequipo}
                  index="IdTipoEquipo"
                  texts={["TipoEquipo"]}
                  label="Tipo de Equipo"
                  placeholder="Seleccionar"
                />
                <SelectNormalComponent
                  array={marca}
                  value="IdMarca"
                  texts={["Marca"]}
                  label="Marca"
                  placeholder="Seleccione una Marca"
                  prop={{}}
                />
                <SelectNormalComponent
                  array={modelo}
                  value="IdModelo"
                  texts={["Modelo"]}
                  label="Modelo"
                  placeholder="Seleccione un Modelo"
                  prop={{}}
                />
              </form>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="5" title="EquipoDescuento">
          <Card>
            <CardBody></CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
