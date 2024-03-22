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
  ModalProps
} from "@nextui-org/react";
import { TicketIcon } from "@heroicons/react/24/solid";
import { Textarea } from "@nextui-org/react";
import SelectMultipleComponent from "../Select/SelectMultiple";
import SelectComponent from "../Select/Select";
import { getlistarArea,getlistarPrioridad} from "@/src/actions/select";

export default  function ModalTicketComponent() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scrollBehavior ] = React.useState<ModalProps["scrollBehavior"]>("inside");

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
  

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Crear Ticket
      </Button>
      <Modal  isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={scrollBehavior} placement="top-center" className="overflow-hidden">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Crear Ticket
              </ModalHeader>
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
                />
                <Textarea
                  isRequired
                  label="Descripcion"
                  labelPlacement="outside"
                  placeholder="Describe tu problema"
                  variant="bordered"
                />
                <SelectComponent array={area} value="IdArea" text="Area" label="Area designada" placeholder="escoge un area"/>  
                <SelectMultipleComponent/>
                <SelectComponent array={prioridad} value="IdPrioridad" text="Prioridad" label="Prioridad" placeholder="seleccione la prioridad"/>             
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

