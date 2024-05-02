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
import { SocketContext } from "@/src/context/SocketContext";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputComponent from "../Input/Input";
import { useFieldArray, useForm } from "react-hook-form";
import SelectNormalComponent from "../Select/SelectNormal";
import TextAreaNormalComponent from "../Textarea/TextAreaNormal";
export default function TabCrearEquipo() {
  const { socket } = useContext(SocketContext);
  const { data: session } = useSession();
  const [selectedTab, setSelectedTab] = useState(0); // Estado para el índice de la pestaña seleccionada
  const [equipo, setEquipo] = useState<any>([]);
  const [tipoequipo, setTipoEquipo] = useState<any>([]);
  const [cliente, setCliente] = useState<any>([]);
  const [marca, setMarca] = useState<any>([]);
  const [modelo, setModelo] = useState<any>([]);
  const [btnguardar, setBtnGuardar] = useState<any>(true);

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
  const { register: rEquipo, handleSubmit: fEquipo } = useForm();
  const actionEquipo = async (dato: any) => {
    socket?.emit("crear-equipo", dato, (marca: any) => {
      console.log("blon", marca);
    });
  };

  const {
    register: rEquipoDescuento,
    handleSubmit: fEquipoDescuento,
    control,
    reset,
  } = useForm();
  const { fields, append, prepend, remove, swap, move, insert, replace } =
    useFieldArray({
      control,
      name: "test",
    });

  const actionEquipoDescuento = async (dato: any) => {
    console.log("ysy", dato);
    socket?.emit("crear-equipodescuento", dato, (equipodescuento: any) => {
      console.log("blon", equipodescuento);
    });
    remove();
    setBtnGuardar(true);
  };

  const {
    register: rLogicaEquipoDescuento,
    handleSubmit: fLogicaEquipoDescuento,
  } = useForm();

  const actionLogicaEquipoDescuento = async (dato: any) => {
    for (let i = 0; i < dato.CMes; i++) {
      insert(i, {
        Equipo: dato.IdEquipo,
        Tiempo: i + 1,
        Precio: "",
      });
    }
    setBtnGuardar(false);
  };

  /*UseEffect*/
  useEffect(() => {
    socket?.emit("listar-tipoequipo", null, (tipoequipo: any) => {
      setTipoEquipo(tipoequipo);
    });
    socket?.emit("listar-cliente", null, (cliente: any) => {
      setCliente(cliente);
    });
    socket?.emit("listar-marca", null, (marca: any) => {
      setMarca(marca);
      console.log("blon", marca);
    });
    socket?.emit("listar-modelo", null, (modelo: any) => {
      setModelo(modelo);
      console.log("blon", modelo);
    });
    socket?.emit("listar-equipo", null, (equipo: any) => {
      setEquipo(equipo);
      console.log("blon", equipo);
    });
  }, []);

  return (
    <div className="flex w-full flex-col">
      <Tabs
        disabledKeys={["music"]}
        selectedKey={selectedTab}
        onSelectionChange={handleTabChange}
      >
        <Tab key="1" title="Equipo">
          <Card>
            <CardBody>
              <form className="flex justify-center items-center flex-col w-full gap-3">
                <SelectNormalComponent
                  array={cliente}
                  value="IdCliente"
                  texts={["CodCliente"]}
                  label="Cliente"
                  placeholder="Seleccionar un cliente"
                  prop={{ ...rEquipo("Cliente") }}
                />
                <SelectNormalComponent
                  array={tipoequipo}
                  value="IdTipoEquipo"
                  texts={["TipoEquipo"]}
                  label="Tipo de Equipo"
                  placeholder="Seleccionar"
                  prop={{ ...rEquipo("TipoEquipo") }}
                />
                <SelectNormalComponent
                  array={marca}
                  value="IdMarca"
                  texts={["Marca"]}
                  label="Marca"
                  placeholder="Seleccione una Marca"
                  prop={{ ...rEquipo("Marca") }}
                />
                <SelectNormalComponent
                  array={modelo}
                  value="IdModelo"
                  texts={["Modelo"]}
                  label="Modelo"
                  placeholder="Seleccione un Modelo"
                  prop={{ ...rEquipo("Modelo") }}
                />
                <TextAreaNormalComponent
                  label="Especificación"
                  prop={{ ...rEquipo("Especificacion") }}
                />
                <Select
                  label="Gamma"
                  className="w-full"
                  labelPlacement="outside"
                  placeholder="Seleccionar"
                  {...rEquipo("Gamma")}
                >
                  <SelectItem key={1} value="Alta">
                    Alta
                  </SelectItem>
                  <SelectItem key={2} value="Media">
                    Media
                  </SelectItem>
                  <SelectItem key={3} value="Baja">
                    Baja
                  </SelectItem>
                </Select>
                <Button
                  type="button"
                  onClick={fEquipo(actionEquipo)}
                  color="primary"
                >
                  Guardar Precios
                </Button>
              </form>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="2" title="TipoEquipo">
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
        <Tab key="3" title="Marca">
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
        <Tab key="4" title="Modelo">
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
        <Tab key="5" title="EquipoDescuento">
          <Card>
            <CardBody>
              <h1>Escoger los precios en función al mes</h1>
              <br />
              <form className="flex flex-col justify-center items-center">
                <SelectNormalComponent
                  array={equipo}
                  value="IdEquipo"
                  texts={[ "CodCliente", "Marca", "Modelo"]}
                  label="Equipo"
                  placeholder="Seleccionar"
                  prop={{ ...rLogicaEquipoDescuento(`IdEquipo`) }}
                />
                <Input
                  label="Cantidad de Meses"
                  labelPlacement="outside"
                  type="number"
                  {...rLogicaEquipoDescuento(`CMes`)}
                />
                <div className="flex gap-5 py-3">
                  <Button
                    onClick={fLogicaEquipoDescuento(
                      actionLogicaEquipoDescuento
                    )}
                  >
                    Iniciar
                  </Button>
                  <Button
                    onClick={() => {
                      remove();
                      setBtnGuardar(true);
                    }}
                  >
                    Resetear
                  </Button>
                </div>
              </form>
              <form>
                <ul>
                  {fields.map((item, index) => {
                    return (
                      <li key={item.id}>
                        <Input
                          label={`Equipo ${index + 1}`}
                          labelPlacement="outside"
                          type="text"
                          className="hidden"
                          {...rEquipoDescuento(`test.${index}.Equipo`)}
                        />
                        <Input
                          label={`Tiempo ${index + 1}`}
                          labelPlacement="outside"
                          type="text"
                          className="hidden"
                          {...rEquipoDescuento(`test.${index}.Tiempo`)}
                        />
                        <Input
                          label={`Precio ${index + 1}`}
                          labelPlacement="outside"
                          type="text"
                          {...rEquipoDescuento(`test.${index}.Precio`)}
                        />
                      </li>
                    );
                  })}
                </ul>

                <Button
                  type="button"
                  onClick={fEquipoDescuento(actionEquipoDescuento)}
                  color="primary"
                  isDisabled={btnguardar}
                >
                  Guardar Precios
                </Button>
              </form>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
