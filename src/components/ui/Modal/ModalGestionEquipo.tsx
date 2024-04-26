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
import TabCrearEquipo from "../Tabs/TabCrearEquipo";

export default function ModalGestionEquipo() {
  /*Context*/
  const { data: session } = useSession();
  const { socket } = useContext(SocketContext);
  /*NextUI*/
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  /*Estados*/

  const [tipomotivo, setTipoMotivo] = useState([]);
  /*Modo Estado*/
  const [selecttiposolicitud, setSelectTipoSolicitud] = useState("");
  const [modotipoequipo, setModoTipoequipo] = useState(false);
  const [modomarca, setModoMarca] = useState(false);
  const [modomodelo, setModoModelo] = useState(false);
  /*Extra Estado*/
  const [precioPorMes, setPrecioPorMes] = useState<any>(0);
  const [cantidadMeses, setCantidadMeses] = useState<any>(0);
  const [meses, setMeses] = useState<any>([]);

  //Formulario
  const { register, handleSubmit } = useForm();

  /*Acciones Form*/
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
  
  
  const actionModelo = async (dato: any) => {
    socket?.emit("crear-marca", dato, (marca: any) => {
      console.log("blon", marca);
    });
  };
  /*Acciones Extra*/
  const handleSelectChange = async (selectedValue: string) => {
    try {
      console.log(selectedValue);
      const data = {
        Marca_id: selectedValue,
      };
      socket?.emit("listar-modelo", data, (modelo: any) => {
        console.log(modelo);
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
              <TabCrearEquipo />
              <form className="h-[90%]">
                <ModalBody className="h-[84%] overflow-auto">
                  <Divider className="my-4" />
                  <div className="flex justify-center items-center">
                    <CheckboxComponent
                      texto=""
                      isselected={modotipoequipo}
                      onValueChange={setModoTipoequipo}
                    />

                   
                  </div>
                  <Divider className="my-4" />
                  <div className="flex justify-center items-center">
                   
                  </div>
                  <Divider className="my-4" />
                  <div className="flex justify-center items-center">
                    <CheckboxComponent
                      texto=""
                      isselected={modomarca}
                      onValueChange={setModoMarca}
                    />
                   
                      
                    
                  </div>
                  <Divider className="my-4" />
                  <div className="flex justify-center items-center">
                    <CheckboxComponent
                      texto=""
                      isselected={modomodelo}
                      onValueChange={setModoModelo}
                    />
                    
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
