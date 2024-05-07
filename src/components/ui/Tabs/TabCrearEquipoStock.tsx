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
import ExcelCarga from "../Extra/FileUpload";
import SelectStateComponent from "../Select/SelectState";
export default function TabCrearEquipoStock() {
  const { socket } = useContext(SocketContext);
  const { data: session } = useSession();
  const [selectedTab, setSelectedTab] = useState(0); // Estado para el índice de la pestaña seleccionada
  const [equipo, setEquipo] = useState<any>([]);

  const [clasificacionequipo, setClasificacionEquipo] = useState<any>([]);
  const [tipoequipo, setTipoEquipo] = useState<any>([]);
  const [cliente, setCliente] = useState<any>([]);
  const [selectclasificacionequipo, setSelectClasificacionEquipo] =
    useState<any>([]);
  const [selecttipoequipo, setSelectTipoEquipo] = useState<any>([]);
  const [selectcliente, setSelectCliente] = useState<any>([]);
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

  const {
    register: rEquipoStock,
    handleSubmit: fEquipoStock,
    control,
    reset,
  } = useForm();

  const { fields, append, prepend, remove, swap, move, insert, replace } =
    useFieldArray({
      control,
      name: "test",
    });

  const actionEquipoStock = async (dato: any) => {
    socket?.emit("ingresar-stock", dato, (equipostock: any) => {
      console.log("blon", equipostock);
    });
    remove();
    setBtnGuardar(true);
  };

  const { register: rLogicaEquipoStock, handleSubmit: fLogicaEquipoStock } =
    useForm();

  const actionLogicaEquipoStock = async (dato: any) => {
    if (selectclasificacionequipo == "Seriado") {
      for (let i = 0; i < dato.Cantidad; i++) {
        insert(i, {
          Equipo: dato.IdEquipo,
        });
      }
      setBtnGuardar(false);
    } else if (selectclasificacionequipo == "Accesorio") {    
      const data={
        IdEquipo:dato.IdEquipo,
        Cantidad:dato.Cantidad,
        Clasificacion:selectclasificacionequipo
      }
      console.log("pepe",data)

      socket?.emit("ingresar-stock", data, (equipostock: any) => {
        console.log("blon", equipostock);
      });
      remove();
      setBtnGuardar(true);
    }
  };

  /*UseEffect*/
  useEffect(() => {
    socket?.emit("listar-cliente", null, (cliente: any) => {
      setCliente(cliente);
    });
    socket?.emit(
      "listar-clasificacionequipo",
      null,
      (clasificacionequipo: any) => {
        setClasificacionEquipo(clasificacionequipo);
      }
    );
  }, []);

  useEffect(() => {
    const data = {
      Clasificacion: selectclasificacionequipo,
    };
    socket?.emit("listar-tipoequipoxcl", data, (tipoequipo: any) => {
      setTipoEquipo(tipoequipo);
    });
  }, [selectclasificacionequipo]);

  useEffect(() => {
    const data = {
      Cliente: selectcliente,
      TipoEquipo: selecttipoequipo,
    };
    socket?.emit("listar-equipoxclxtc", data, (equipoxclxtc: any) => {
      setEquipo(equipoxclxtc);
      console.log("blon", equipoxclxtc);
    });
  }, [selecttipoequipo, selectcliente, selectclasificacionequipo]);

  return (
    <div className="flex w-full flex-col">
      <Tabs
        disabledKeys={["music"]}
        selectedKey={selectedTab}
        onSelectionChange={handleTabChange}
      >
        <Tab key="1" title="Carga Masiva">
          <Card>
            <CardBody>
              <ExcelCarga />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="2" title="Ingreso Stock">
          <Card>
            <CardBody>
              <h1>Ingresar las series</h1>
              <br />
              <form className="flex flex-col justify-center items-center gap-2">
                <SelectStateComponent
                  array={cliente}
                  index="IdCliente"
                  texts={["CodCliente"]}
                  label="Cliente"
                  placeholder="Seleccionar un cliente"
                  value={selectcliente}
                  onChange={setSelectCliente}
                />
                <SelectStateComponent
                  array={clasificacionequipo}
                  index="Clasificacion"
                  texts={["Clasificacion"]}
                  label="Clasificacion"
                  placeholder="Seleccionar una opcion"
                  value={selectclasificacionequipo}
                  onChange={setSelectClasificacionEquipo}
                />
                <SelectStateComponent
                  array={tipoequipo}
                  index="IdTipoEquipo"
                  texts={["TipoEquipo"]}
                  label="Tipo de Equipo"
                  placeholder="Seleccionar"
                  value={selecttipoequipo}
                  onChange={setSelectTipoEquipo}
                />
                <SelectNormalComponent
                  array={equipo}
                  value="IdEquipo"
                  texts={["Marca", "Modelo"]}
                  label="Equipo"
                  placeholder="Seleccionar"
                  prop={{ ...rLogicaEquipoStock(`IdEquipo`) }}
                />
                <Input
                  label="Cantidad"
                  labelPlacement="outside"
                  type="number"
                  {...rLogicaEquipoStock(`Cantidad`)}
                />
                <div className="flex gap-5 py-3">
                  <Button onClick={fLogicaEquipoStock(actionLogicaEquipoStock)}>
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
                          value={selectclasificacionequipo}
                          {...rEquipoStock(`Clasificacion`)}
                        />
                        <Input
                          label={`Equipo ${index + 1}`}
                          labelPlacement="outside"
                          type="text"
                          className="hidden"
                          {...rEquipoStock(`test.${index}.Equipo`)}
                        />
                        <Input
                          label={`Equipo ${index + 1}`}
                          labelPlacement="outside"
                          type="text"
                          className={
                            selectclasificacionequipo == "Accesorio"
                              ? "hidden"
                              : "block"
                          }
                          {...rEquipoStock(`test.${index}.Serie`)}
                        />
                      </li>
                    );
                  })}
                </ul>

                <Button
                  className={
                    selectclasificacionequipo == "Accesorio" ? "hidden" : ""
                  }
                  type="button"
                  onClick={fEquipoStock(actionEquipoStock)}
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
