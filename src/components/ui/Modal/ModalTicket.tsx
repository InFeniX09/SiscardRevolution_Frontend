"use client";
import React, { useEffect, useState } from "react";
import {
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
import { TicketIcon } from "@heroicons/react/24/solid";
import { Textarea } from "@nextui-org/react";
import SelectMultipleComponent from "../Select/SelectMultiple";
import SelectComponent from "../Select/Select";
import { getlistarArea, getlistarPrioridad } from "@/src/actions/select";

import { createTicketclient } from "@/src/actions/auth/auth";
import { useFormState } from "react-dom";

export default function ModalTicketComponent() {
   const [state, dispatch] = useFormState(createTicketclient, undefined);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scrollBehavior] =
    React.useState<ModalProps["scrollBehavior"]>("inside");

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
  
  useEffect(() => {
    if (state === "Success") {
      onOpenChange(); // Close the modal after successful submission
    }
  }, [state]);

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Crear Ticket
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={scrollBehavior}
        placement="top-center"
        className="overflow-hidden"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Crear Ticket
              </ModalHeader>
              <form action={dispatch}>
                <ModalBody>
                  <Input
                    autoFocus
                    endContent={
                      <TicketIcon className="h-5 text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Asunto"
                    placeholder="Ingresar Asunto"
                    labelPlacement="outside"
                    variant="bordered"
                    name="Asunto"
                  />
                  <Textarea
                    isRequired
                    label="Descripcion"
                    labelPlacement="outside"
                    placeholder="Describe tu problema"
                    variant="bordered"
                    name="Descripcion"
                  />

                  <SelectMultipleComponent />
                  <SelectComponent
                    array={area}
                    value="IdArea"
                    text="Area"
                    label="Area designada"
                    placeholder="escoge un area"
                    name="Area"
                  />
                  <SelectComponent
                    array={prioridad}
                    value="IdPrioridad"
                    text="Prioridad"
                    label="Prioridad"
                    placeholder="seleccione la prioridad"
                    name="Prioridad"
                  />
                </ModalBody>
                <ModalFooter>
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
