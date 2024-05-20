"use client";
import React, { useContext, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { SocketContext } from "@/src/context/SocketContext";

import TabCrearEquipo from "../Tabs/TabCrearEquipo";
import TabCrearGestionEntidad from "../Tabs/TabCrearGestionEntidad";

export default function ModalGestionEntidad() {
  /*Context*/
  const { data: session } = useSession();
  const { socket } = useContext(SocketContext);
  /*NextUI*/
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  /*Estados*/
  /*Modo Estado*/
  const [selecttiposolicitud, setSelectTipoSolicitud] = useState("");

  /*Extra Estado*/

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

  return (
    <>
      <div>
        <Button
          className="custom-btn btn-11 bg-red-500 flex"
          onPress={onOpen}
          endContent={<UserPlusIcon className="h-5" />}
          size="sm"
          color="danger"
        >
          Creaciones
        </Button>
      </div>

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
              <ModalBody className="h-[84%] overflow-auto">
                <TabCrearGestionEntidad />
              </ModalBody>
              <ModalFooter className="h-[16%]">
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
