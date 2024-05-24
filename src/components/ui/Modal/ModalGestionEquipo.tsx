"use client";
import React from "react";
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
import TabCrearEquipo from "../Tabs/TabCrearEquipo";

export default function ModalGestionEquipo() {
  //-------------------------
  //NextUI
  //-------------------------
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button
        onPress={onOpen}
        endContent={<UserPlusIcon className="h-5" />}
        size="sm"
        color="danger"
        className=" overflow-visible"
      >
        Creaciones
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="h-[90vh]"
        classNames={{ wrapper: "overflow-hidden" }}
        size="xl"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 h-[10%]">
                Crear Equipo Completo
              </ModalHeader>
              <ModalBody className="h-[84%] overflow-auto">
                <TabCrearEquipo />
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
