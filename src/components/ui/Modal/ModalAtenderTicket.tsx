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
  Tooltip,
  Tabs,
  Tab,
  Card,
  CardBody,
} from "@nextui-org/react";
import { TicketIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SocketContext } from "@/src/context/SocketContext";
import SelectMultipleComponent from "../Select/SelectMultiple";
import SelectNormalComponent from "../Select/SelectNormal";
import SelectComponent from "../Select/Select";

interface Props {
  datosolicitud: string;
  datomotivo: string;

}

export default function ModalAtenderTicketComponent({datosolicitud,datomotivo}:Props) {
  const { data: session } = useSession();
  const { socket } = useContext(SocketContext);
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onOpenChange: onOpenChange1,
  } = useDisclosure();

  return (
    <>
      <Tooltip content="Atender">
        <UserPlusIcon className="h-5" onClick={onOpen1} />
      </Tooltip>
      <Modal
        isOpen={isOpen1}
        onOpenChange={onOpenChange1}
        aria-label="Modal para atender ticket"
        aria-labelledby="modal-title"
        size="2xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1>Atender solicitud</h1>
                <p className="text-[0.8rem]">Solicitud: {datosolicitud}</p>
                <p className="text-[0.8rem]">Motivo: {datomotivo}</p>
              </ModalHeader>
              <ModalBody className="h-[84%] overflow-auto">
                <div className="flex w-full flex-col">
                  <Tabs disabledKeys={["music"]} aria-label="Disabled Options">
                    <Tab key="1" title="1er Paso">
                      <Card>
                        <CardBody>
                          <h1 className="text-red-500">Asignación</h1>
                          <h2>Stock Técnico</h2>
                          <div className="flex flex-col">
                            <select title="Celular" className="bg-blue-500">
                              <option>celular</option>
                            </select>
                            <select title="Celular">
                              <option>laptop</option>
                            </select>
                            <select title="Celular">
                              <option>hola</option>
                            </select>
                          </div>
                          <h2>Stock Sistemas</h2>
                        </CardBody>
                      </Card>
                    </Tab>
                    <Tab key="2" title="2do Paso">
                      <Card>
                        <CardBody>
                          Ut enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo
                          consequat. Duis aute irure dolor in reprehenderit in
                          voluptate velit esse cillum dolore eu fugiat nulla
                          pariatur.
                        </CardBody>
                      </Card>
                    </Tab>
                    <Tab key="3" title="3er Paso">
                      <Card>
                        <CardBody>
                          Excepteur sint occaecat cupidatat non proident, sunt
                          in culpa qui officia deserunt mollit anim id est
                          laborum.
                        </CardBody>
                      </Card>
                    </Tab>
                  </Tabs>
                </div>
              </ModalBody>
              <ModalFooter className="h-full">
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