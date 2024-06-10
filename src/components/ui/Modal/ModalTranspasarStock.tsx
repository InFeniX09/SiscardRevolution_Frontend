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
  CheckboxGroup,
  Checkbox,
} from "@nextui-org/react";
import { TicketIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SocketContext } from "@/src/context/SocketContext";
import SelectMultipleComponent from "../Select/SelectMultiple";
import SelectNormalComponent from "../Select/SelectNormal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CheckboxGroupComponent from "../Checkbox/CheckboxGroup";
interface Props {
  IdEquipoStock: number;
}

export default function ModalTranspasarStock({ IdEquipoStock }: Props) {
  const { data: session } = useSession();
  const { socket } = useContext(SocketContext);
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onOpenChange: onOpenChange1,
  } = useDisclosure();

  const [selectedTab, setSelectedTab] = useState(0);
  const [estadocelular, setEstadoCelular] = useState(false);
  const [estadochip, setEstadoChip] = useState(false);
  const [estadolaptop, setEstadoLaptop] = useState(false);
  const [selected, setSelected] = React.useState(["buenos-aires", "sydney"]);

  const [equipoaccesorio, setEquipoAccesorio] = useState<any>([]);

  const [equipocelular, setEquipoCelular] = useState<any>([]);
  const [equipolaptop, setEquipoLaptop] = useState<any>([]);
  const [equipochip, setEquipoChip] = useState<any>([]);
  const [accesorio, setAccesorio] = useState<any>([]);
  const [datospdf, setDatosPdf] = useState<any>();
  const [datospdf1, setDatosPdf1] = useState<any>();

  const [selectequipogrupo, setSelectEquipoGrupo] = useState<any>();

  const [equipostockxid, setEquipoStockXId] = useState<any>([
    {
      TipoSolicitud: "",
      TipoMotivo: "",
      Usuario: "",
      IdTipoSolicitud: "",
      IdTipoMotivo: "",
    },
  ]);

  useEffect(() => {
    if (isOpen1 == true) {
      socket?.emit(
        "listar-equiposeriexidequipostock",
        { IdEquipoStock: IdEquipoStock },
        (equipostockxid: any) => {
          setEquipoStockXId(equipostockxid);
          console.log(equipostockxid);
        }
      );
      socket?.emit(
        "listar-usuario",
        "",
        (equipostockxid: any) => {
          setEquipoStockXId(equipostockxid);
          console.log(equipostockxid);
        }
      );

      
    }
  }, [isOpen1]);

  const handleTabChange = (key: any) => {
    setSelectedTab(key);
    switch (Number(key)) {
    }
  };

  const { register:rLogicaTranspasoEquipo, handleSubmit:fLogicaTranspasoEquipo } = useForm();

  const actionLogicaTranspasoEquipo = async (dato: any) => {
    console.log("a", selectequipogrupo);
  };
  return (
    <>
      <Tooltip content="Transpasar">
        <UserPlusIcon className="h-5" onClick={onOpen1} />
      </Tooltip>
      <Modal
        isOpen={isOpen1}
        onOpenChange={onOpenChange1}
        aria-label="Modal para atender ticket"
        aria-labelledby="modal-title"
        size="2xl"
        isDismissable={false}
        className="h-[90vh]"
        classNames={{ wrapper: "overflow-hidden" }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 border-b-2 border-red-400 "></ModalHeader>
              <ModalBody className="h-[80%] overflow-auto">
                <Tabs
                  disabledKeys={["music"]}
                  selectedKey={selectedTab}
                  onSelectionChange={handleTabChange}
                >
                  <Tab key="1" title="Seleccion de Equipos">
                    <Card>
                      <CardBody>
                        <form onSubmit={fLogicaTranspasoEquipo(actionLogicaTranspasoEquipo)}>
                          <CheckboxGroupComponent
                            array={equipostockxid}
                            index="IdEquipoSerie"
                            texts={["Serie"]}
                            label="Serie"
                            value={selectequipogrupo}
                            onChange={setSelectEquipoGrupo}
                          />
                          <SelectNormalComponent
                            array={equipocelular}
                            value="IdEquipoSerie"
                            texts={["CodCliente", "Marca", "Modelo", "Serie"]}
                            label="Celular"
                            placeholder="Seleccionar un cliente"
                            prop={{ ...rLogicaTranspasoEquipo(`Equipo`) }}
                          />
                          <Button type="submit">Iniciar</Button>
                        </form>
                      </CardBody>
                    </Card>
                  </Tab>
                  <Tab key="2" title="Detalles">
                    <Card>
                      <CardBody></CardBody>
                    </Card>
                  </Tab>
                </Tabs>
              </ModalBody>
              <ModalFooter className="border-t-2 border-red-400">
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
