"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
  Divider,
} from "@nextui-org/react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useFieldArray, useForm } from "react-hook-form";
import { SocketContext } from "@/src/context/SocketContext";
import SelectNormalComponent from "../Select/SelectNormal";
import SelectComponent from "../Select/Select";
import InputComponent from "../Input/Input";
import CheckboxComponent from "../Checkbox/Checkbox";
import TextAreaNormalComponent from "../Textarea/TextAreaNormal";
import SelectStateComponent from "../Select/SelectState";

export default function ModalGestionEquipo() {
  const { data: session } = useSession();
  const { socket } = useContext(SocketContext);
  const [tipoequipo, setTipoEquipo] = useState<any>([]);
  const [cliente, setCliente] = useState<any>([]);
  const [marca, setMarca] = useState<any>([]);
  const [modelo, setModelo] = useState<any>([]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [tipomotivo, setTipoMotivo] = useState([]);
  const [selecttiposolicitud, setSelectTipoSolicitud] = useState("");
  const [modotipoequipo, setModoTipoequipo] = useState(false);
  const [modomarca, setModoMarca] = useState(false);
  const [modomodelo, setModoModelo] = useState(false);

  const [precioPorMes, setPrecioPorMes] = useState<any>(0);
  const [cantidadMeses, setCantidadMeses] = useState<any>(0);
  const [meses, setMeses] = useState<any>([]);

  const [idTipoEquipo, setidTipoEquipo] = React.useState<any>([]);

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
  //Formulario
  const { register, handleSubmit } = useForm();
  const { register:r, handleSubmit:h } = useForm();

  const enviarctp = async (dato: any) => {
    console.log(dato);

    const { tipomotivo } = dato;
    const DeUsuario_id = session?.user.IdUsuario;
    const data = {
      TipoSolicitud_id: selecttiposolicitud,
      TipoMotivo_id: tipomotivo,
      Usuario_id: DeUsuario_id,
    };
    socket?.emit("crear-solicitud", data, (respuesta: any) => {
      if (respuesta === "si") {
        console.log("Se creo");
      } else {
        console.log("NO creo");
      }
    });
  };

  const enviarctp1 = async (dato: any) => {
    console.log(dato);
  };

  const handleSelectChange = async (selectedValue: string) => {
    try {
      console.log(selectedValue);
      const data = {
        Marca_id: selectedValue,
      };
      socket?.emit("listar-modelo", data, (modelo: any) => {
        console.log(modelo);
        setModelo(modelo);
        console.log("yupi", modelo);
      });
    } catch (error) {
      console.error("Error fetching radiogroup data:", error);
    }
  };
  const handleStart = () => {
    const newMeses = Array.from({ length: cantidadMeses }, (_, i) => ({
      label: `${i + 1} mes`,
      value: i + 1,
      precio: precioPorMes * (i + 1),
    }));
    setMeses(newMeses);
  };

  const handleChangeCantidadMeses = (event: any) => {
    setCantidadMeses(parseInt(event.target.value));
  };

  const handleGuardarPrecios = () => {
    console.log("Precios por mes:");
    console.log(meses);
  };

  return (
    <>
      <Button
        onPress={onOpen}
        endContent={<UserPlusIcon className="h-5" />}
        size="sm"
        color="danger"
        className=" overflow-visible"
      >
        Crear Nuevo Equipo
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="h-[90vh]"
        classNames={{ wrapper: "overflow-hidden" }}
        size="xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 h-[10%]">
                Crear Equipo Completo
              </ModalHeader>
              <form  className="h-[90%]">
                <ModalBody className="h-[84%] overflow-auto">
                  <Divider className="my-4" />

                  <div className="flex justify-center items-center">
                    <CheckboxComponent
                      texto=""
                      isSelected={modotipoequipo}
                      onValueChange={setModoTipoequipo}
                    />
                    {modotipoequipo ? (
                      <form className="flex justify-center items-center flex-col w-full gap-3">
                        <InputComponent
                          name=""
                          tipo="text"
                          titulo="Nuevo Tipo de Equipo"
                          placeholder=""
                          icon
                          icon1={"hidden"}
                        />
                        <Select
                          label="Especificación"
                          className="w-full"
                          labelPlacement="outside"
                          placeholder="Seleccionar"
                        >
                          <SelectItem key={1} value="Seriado">
                            Seriado
                          </SelectItem>
                          <SelectItem key={2} value="Consumible">
                            Consumible
                          </SelectItem>
                          <SelectItem key={3} value="Sustituible">
                            Sustituible
                          </SelectItem>
                          <SelectItem key={4} value="Accesorio">
                            Accesorio
                          </SelectItem>
                        </Select>
                        <Input
                            label={"2"}
                            labelPlacement="outside"
                            type="number"
                            defaultValue="0"
                            {...r(`papi`)}
                          />
                        <Button
                          color="danger"
                          onClick={h(enviarctp1)}
                        >
                          Añadir
                        </Button>
                      </form>
                    ) : (
                      <>
                        <SelectStateComponent
                          array={tipoequipo}
                          index="IdTipoEquipo"
                          texts={["TipoEquipo"]}
                          label="Tipo de Equipo"
                          placeholder="Seleccionar"
                        />
                      </>
                    )}
                  </div>
                  <Divider className="my-4" />

                  <div className="flex justify-center items-center">
                    <SelectNormalComponent
                      array={cliente}
                      value="IdCliente"
                      texts={["CodCliente"]}
                      label="Cliente"
                      placeholder="Seleccionar un cliente"
                      prop={{}}
                    />
                  </div>
                  <Divider className="my-4" />

                  <div className="flex justify-center items-center">
                    <CheckboxComponent
                      texto=""
                      isSelected={modomarca}
                      onValueChange={setModoMarca}
                    />
                    {modomarca ? (
                      <div className="flex justify-center items-center flex-col w-full gap-3">
                        <InputComponent
                          name=""
                          tipo="text"
                          titulo="Nueva Marca"
                          placeholder=""
                          icon
                          icon1={"hidden"}
                        />
                        <SelectNormalComponent
                          array={tipoequipo}
                          value="IdTipoEquipo"
                          texts={["TipoEquipo"]}
                          label="Tipo de Equipo"
                          placeholder="Seleccionar"
                          prop={{}}
                        />
                        <Button type="submit" color="danger">
                          Añadir
                        </Button>
                      </div>
                    ) : (
                      <SelectComponent
                        array={marca}
                        value="IdMarca"
                        texts={["Marca"]}
                        label="Marca"
                        placeholder="Seleccione una Marca"
                        prop={{}}
                        onSelectChange={handleSelectChange}
                      />
                    )}
                  </div>
                  <Divider className="my-4" />

                  <div className="flex justify-center items-center">
                    <CheckboxComponent
                      texto=""
                      isSelected={modomodelo}
                      onValueChange={setModoModelo}
                    />
                    {modomodelo ? (
                      <InputComponent
                        name=""
                        tipo="text"
                        titulo="Modelo"
                        placeholder=""
                        icon
                        icon1={"hidden"}
                      />
                    ) : (
                      <SelectNormalComponent
                        array={modelo}
                        value="IdModelo"
                        texts={["Modelo"]}
                        label="Modelo"
                        placeholder="Seleccione un Modelo"
                        prop={{}}
                      />
                    )}
                  </div>
                  <Divider className="my-4" />
                  <TextAreaNormalComponent label="Especificación" />
                  <Select
                    label="Gamma"
                    className="w-full"
                    labelPlacement="outside"
                    placeholder="Seleccionar"
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
                  <Divider className="my-4" />
                  <div className="flex justify-center items-center">
                    <Input
                      label="Cantidad de Meses"
                      labelPlacement="outside"
                      type="number"
                      value={cantidadMeses}
                      onChange={handleChangeCantidadMeses}
                    />
                    <Button onClick={handleStart}>Iniciar</Button>
                  </div>
                  <Divider className="my-4" />
                  <form>
                    <h1>Escoger los precios en función al mes</h1>
                    <br />
                    <div className="grid grid-cols-2 gap-3">
                      {meses.map((mes: any, index: number) => (
                        <div key={mes.value} className="flex gap-3">
                          <Input
                            label={`${mes.label}`}
                            labelPlacement="outside"
                            type="number"
                            defaultValue="0"
                            {...register(`preciosPorMes[${index}].precio`)}
                          />
                        </div>
                      ))}
                    </div>
                    <Button
                      type="button"
                      onClick={handleGuardarPrecios}
                      color="primary"
                    >
                      Guardar Precios
                    </Button>
                  </form>
                </ModalBody>
                <ModalFooter className="h-[16%]">
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button color="primary" onClick={handleSubmit(enviarctp)}>
                    Crear
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
