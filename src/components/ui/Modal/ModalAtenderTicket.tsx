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
import { Document, Page, PDFViewer } from "@react-pdf/renderer";

interface Props {
  datosolicitud: string;
  datomotivo: string;
}

export default function ModalAtenderTicketComponent({
  datosolicitud,
  datomotivo,
}: Props) {
  const { data: session } = useSession();
  const { socket } = useContext(SocketContext);
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onOpenChange: onOpenChange1,
  } = useDisclosure();

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

  const [mostrarPDF, setMostrarPDF] = useState(false);

  useEffect(() => {
    socket?.emit(
      "listar-equipoxclasificacion",
      "",
      (equipoxclasificacion: any) => {
        setEquipoAccesorio(equipoxclasificacion);
      }
    );
    const datacelular = {
      TipoEquipo: "Celular",
    };
    const datalaptop = {
      TipoEquipo: "Laptop",
    };
    const datachip = {
      TipoEquipo: "Chip",
    };

    socket?.emit(
      "listar-equipoxclxtexusu",
      datacelular,
      (equipoxclasificacion: any) => {
        setEquipoCelular(equipoxclasificacion);
      }
    );
    socket?.emit(
      "listar-equipoxclxtexusu",
      datalaptop,
      (equipoxclasificacion: any) => {
        setEquipoLaptop(equipoxclasificacion);
      }
    );
    socket?.emit(
      "listar-equipoxclxtexusu",
      datachip,
      (equipoxclasificacion: any) => {
        setEquipoChip(equipoxclasificacion);
      }
    );
    socket?.emit("listar-accesorioxclxtexusu", datachip, (Accesorio: any) => {
      setAccesorio(Accesorio);
    });
  }, []);

  const { register: rLogicaEquipoStock, handleSubmit: fLogicaEquipoStock } =
    useForm();

  const actionLogicaEquipoStock = async (dato: any) => {
    socket?.emit("armarpdf-solicitud", "", (datospdf: any) => {
      setDatosPdf(datospdf); // Guardar los datos del PDF
      setMostrarPDF(true);
    });
  };

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
                          <form>
                            <h2>Asignando Items</h2>
                            <div>
                              <div>
                                <SelectNormalComponent
                                  array={equipocelular}
                                  value="IdEquipoSerie"
                                  texts={[
                                    "CodCliente",
                                    "Marca",
                                    "Modelo",
                                    "Serie",
                                  ]}
                                  label="Celular"
                                  placeholder="Seleccionar un cliente"
                                  prop={{}}
                                />
                              </div>
                              <div>
                                <SelectNormalComponent
                                  array={equipochip}
                                  value="IdEquipoSerie"
                                  texts={[
                                    "CodCliente",
                                    "Marca",
                                    "Modelo",
                                    "Serie",
                                  ]}
                                  label="Chip"
                                  placeholder="Seleccionar un cliente"
                                  prop={{}}
                                />
                              </div>
                              <div>
                                <SelectNormalComponent
                                  array={equipolaptop}
                                  value="IdEquipoSerie"
                                  texts={[
                                    "CodCliente",
                                    "Marca",
                                    "Modelo",
                                    "Serie",
                                  ]}
                                  label="Laptop"
                                  placeholder="Seleccionar un cliente"
                                  prop={{}}
                                />
                              </div>
                              <div>
                                <h1>Accesorios</h1>
                                <SelectMultipleComponent
                                  array={accesorio}
                                  value="IdEquipo"
                                  texts={["CodCliente", "Marca", "Modelo"]}
                                  subtexts={[""]}
                                  label="Celular"
                                  placeholder="Seleccionar un cliente"
                                  prop={{}}
                                />
                              </div>
                            </div>
                            <Button
                              onClick={fLogicaEquipoStock(
                                actionLogicaEquipoStock
                              )}
                            >
                              Armar Pdf
                            </Button>
                          </form>
                        </CardBody>
                      </Card>
                    </Tab>
                    <Tab key="2" title="2do Paso">
                      <Card>
                        <CardBody>
                          {mostrarPDF && datospdf && (
                            <PDFViewer width="100%" height={600}>
                              <Document file={{ data: datospdf }}>
                                <Page size="A4" />
                              </Document>
                            </PDFViewer>
                          )}
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
