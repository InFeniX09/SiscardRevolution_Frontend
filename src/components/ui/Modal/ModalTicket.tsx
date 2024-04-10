"use client";
//Manejar estados
import React, { useContext, useEffect, useState } from "react";
//Componentes UI
import {
  Textarea,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  ModalProps,
} from "@nextui-org/react";
//Iconos
import { TicketIcon } from "@heroicons/react/24/solid";
//Componentes
import SelectMultipleComponent from "../Select/SelectMultiple";
import SelectComponent from "../Select/Select";
//Fetch
import {
  createTicket,
  getlistarArea,
  getlistarPrioridad,
  getlistarTicket,
} from "@/src/actions/centro-atencion";
//Intefaces
import { Ticket } from "@/src/interfaces";
//Alerta
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//Formulario
import { SubmitHandler, useForm } from "react-hook-form";
import SelectNormalComponent from "../Select/SelectNormal";
import { useSession } from "next-auth/react";
import { SocketContext } from "@/src/context/SocketContext";

export default function ModalTicketComponent() {
  const { data: session } = useSession();
  const { socket } = useContext(SocketContext);

  const [userData, setTickets] = useState<Ticket[]>([]);

  //Apertura de modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  //Scroll de modal
  const [scrollBehavior] =
    React.useState<ModalProps["scrollBehavior"]>("inside");
  /*
  useEffect(() => {
    console.log("aea");
    
    getlistarTicket()
      .then((newData) => {
        updateUserData(newData);
      })
      .catch((error) => console.error("Error fetching data:", error));
    
  });*/

  //Fetch de datos
  const [area, setAreas] = useState([]);
  const [prioridad, setprioridades] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const areasData = await getlistarArea();
        setAreas(areasData);
        const priodidadesData = await getlistarPrioridad();
        setprioridades(priodidadesData);
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };
    fetchData();
  }, []);
  //Formulario
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Ticket>();

  const onSubmit = async (data: any) => {
    if (session?.user.IdUsuario !== undefined) {
      const { Asunto, Descripcion, idTicketcc, idArea, idPrioridad } = data;

      // Crear el objeto de ticket
      const ticket = {
        Asunto,
        Descripcion,
        idUsuario: session.user.IdUsuario,
        idTicketcc,
        idArea,
        idPrioridad,
      };

      onOpenChange();
      toast("Ticket Creado");
      console.log(ticket)
      
      socket?.emit("crear-ticket", ticket, (ticket: any) => {
        console.log('aca',JSON.stringify(ticket))
      });

      console.log(userData);
    } else {
      // Manejar el caso donde session?.user.IdUsuario es undefined
      // Por ejemplo, mostrar un mensaje de error o tomar otra acción
      console.error("El ID de usuario es undefined en la sesión.");
    }
  };

  return (
    <>
      <ToastContainer />
      <Button onPress={onOpen} color="primary">
        Crear Ticket
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={scrollBehavior}
        placement="top-center"
        className="overflow-hidden h-full"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Crear Ticket
              </ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody className="h-[84%] overflow-auto">
                  <Input
                    autoFocus
                    endContent={
                      <TicketIcon className="h-5 text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Asunto"
                    placeholder="Ingresar Asunto"
                    labelPlacement="outside"
                    variant="bordered"
                    {...register("Asunto", { required: true })}
                  />
                  <Textarea
                    isRequired
                    label="Descripcion"
                    labelPlacement="outside"
                    placeholder="Describe tu problema"
                    variant="bordered"
                    {...register("Descripcion", { required: true })}
                  />
                  <SelectMultipleComponent
                    prop={{ ...register("idTicketcc", { required: true }) }}
                  />
                  <SelectNormalComponent
                    array={area}
                    value="IdArea"
                    texts={["Area"]}
                    label="Area designada"
                    placeholder="escoge un area"
                    prop={{ ...register("idArea", { required: true }) }}
                  />
                  <SelectNormalComponent
                    array={prioridad}
                    value="IdPrioridad"
                    texts={["Prioridad"]}
                    label="Prioridad"
                    placeholder="seleccione la prioridad"
                    prop={{ ...register("idPrioridad", { required: true }) }}
                  />
                </ModalBody>
                <ModalFooter className="h-full">
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit">
                    Sign in
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
