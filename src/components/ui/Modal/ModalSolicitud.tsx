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
  Textarea,
} from "@nextui-org/react";
import { TicketIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SocketContext } from "@/src/context/SocketContext";
import SelectMultipleComponent from "../Select/SelectMultiple";
import SelectNormalComponent from "../Select/SelectNormal";
import SelectComponent from "../Select/Select";

export default function ModalSolicitudComponent() {
  const { data: session } = useSession();
  const { socket } = useContext(SocketContext);
  const [tiposolicitud, setTipoSolicitud] = useState<any>([]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [tipomotivo, setTipoMotivo] = useState([]);
  const [selecttiposolicitud, setSelectTipoSolicitud] = useState("");
  useEffect(() => {
    socket?.emit("listar-tiposolicitud", null, (tiposolicitud: any) => {
      setTipoSolicitud(tiposolicitud);
    });
  }, []);
  //Formulario
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (dato: any) => {
    console.log("from activo");
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
  const handleSelectChange = async (selectedValue: string) => {
    try {
      setSelectTipoSolicitud(selectedValue);
      const data = {
        TipoSolicitud_id: selectedValue,
      };
      socket?.emit("listar-tipomotivo", data, (tipomotivo: any) => {
        console.log(tipomotivo);
        setTipoMotivo(tipomotivo);
        console.log("yupi", tipomotivo);
      });
    } catch (error) {
      console.error("Error fetching radiogroup data:", error);
    }
  };
  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-foreground text-background"
        endContent={<UserPlusIcon className="h-5" />}
        size="sm"
      >
        Crear nueva solicitud
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Crear Solicitud
              </ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody className="h-[84%] overflow-auto">
                  <SelectComponent
                    array={tiposolicitud}
                    value="IdTipoSolicitud"
                    texts={["TipoSolicitud"]}
                    label="Solicitud"
                    placeholder="Seleccione una solicitud"
                    prop={{}}
                    onSelectChange={handleSelectChange}
                  />
                  <SelectNormalComponent
                    array={tipomotivo}
                    value="IdTipoMotivo"
                    texts={["TipoMotivo"]}
                    label="Motivo"
                    placeholder="Seleccione un motivo"
                    prop={{ ...register("tipomotivo", { required: true }) }}
                  />
                </ModalBody>
                <ModalFooter className="h-full">
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button color="primary" type="submit">
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
