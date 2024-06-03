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
interface Props {
  IdSolicitud: number;
}

export default function ModalAtenderTicketComponent({ IdSolicitud }: Props) {
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
  const [datospdf1, setDatosPdf1] = useState<any>();

  const [solicitudxid, setSolicitudXId] = useState<any>([
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
        "listar-solicitudxid",
        { IdSolicitud: IdSolicitud },
        (solicitudxid: any) => {
          setSolicitudXId(solicitudxid);
          console.log(solicitudxid[0]);
        }
      );

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
      const dataaccesorio = {
        TipoEquipo: "Accesorio",
      };

      socket?.emit(
        "listar-equipoxclxtexusu",
        datacelular,
        (equipoxclasificacion: any) => {
          console.log("cel", equipoxclasificacion);
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
      socket?.emit("listar-accesorioxclxtexusu", '', (Accesorio: any) => {
        setAccesorio(Accesorio);
        console.log(Accesorio)
      });
    }
  }, [isOpen1]);

  const { register: rLogicaEquipoStock, handleSubmit: fLogicaEquipoStock } =
    useForm();

  const actionLogicaEquipoStock = async (dato: any) => {
    const usuario_id = session?.user.IdUsuario;
    socket?.emit(
      "armarpdf-solicitud",
      {
        dato,
        Solicitud: solicitudxid[0].TipoSolicitud,
        Motivo: solicitudxid[0].TipoMotivo,
        usuario_id,
        Usuario: solicitudxid[0].Usuario,
      },
      (datospdf: any) => {
        const pdfBlob = new Blob([new Uint8Array(datospdf)], {
          type: "application/pdf",
        });
        const pdfURL = URL.createObjectURL(pdfBlob);
        setDatosPdf(pdfURL);
        setDatosPdf1(pdfBlob);
      }
    );
  };

  const { register: rEnviarPdf, handleSubmit: fEnviarPdf } = useForm();

  const actionEnviarPdf = async () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Desea proceder con la solicitud?",
      text: "Se enviara un correo con lo detallado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, proceder!",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          pdf: datospdf1,
        };
        socket?.emit("enviarcorreo", data, (datospdf: any) => {
          console.log(datospdf);
        });
        Swal.fire({
          title: "Exito!",
          text: "Su solicitud procedio exitosamente.",
          icon: "success",
        });
      }
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
        isDismissable={false}
        className="h-[90vh]"
        classNames={{ wrapper: "overflow-hidden" }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 border-b-2 border-red-400 ">
                <h1>
                  Atender solicitud {"==>"} {solicitudxid[0].Usuario}
                </h1>
                <p className="text-[0.8rem]">
                  Solicitud: {solicitudxid[0].TipoSolicitud}
                </p>
                <p className="text-[0.8rem]">
                  Motivo: {solicitudxid[0].TipoMotivo}
                </p>
              </ModalHeader>
              <ModalBody className="h-[80%] overflow-auto">
                <div className="flex w-full flex-col">
                  {solicitudxid[0].IdTipoSolicitud == 1 &&
                  solicitudxid[0].IdTipoMotivo == 1 ? (
                    <Tabs
                      classNames={{
                        cursor: "bg-[var(--color-peru)]",
                        tabList: "bg-white",
                      }}
                      disabledKeys={["music"]}
                      aria-label="Disabled Options"
                    >
                      <Tab key="1" title="1er Paso"  className="text-white">
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
                                    prop={{ ...rLogicaEquipoStock(`Celular`) }}
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
                                    prop={{ ...rLogicaEquipoStock(`Chip`) }}
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
                                    prop={{ ...rLogicaEquipoStock(`Laptop`) }}
                                  />
                                </div>
                                <div>
                                  <h1>Accesorios</h1>
                                  <SelectMultipleComponent
                                    array={accesorio}
                                    value="IdEquipo"
                                    texts={["CodCliente", "Marca", "Modelo"]}
                                    subtexts={[""]}
                                    label=""
                                    placeholder="Seleccionar un cliente"
                                    prop={{
                                      ...rLogicaEquipoStock(`Accesorio`),
                                    }}
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
                      <Tab key="2" title="2do Paso"  className="text-white">
                        <Card>
                          <CardBody>
                            <iframe
                              src={datospdf}
                              width="100%"
                              height={400}
                            ></iframe>
                            <form>
                              <Button onClick={fEnviarPdf(actionEnviarPdf)}>
                                Enviar Pdf a correo
                              </Button>
                            </form>
                          </CardBody>
                        </Card>
                      </Tab>
                    </Tabs>
                  ) : null}
                </div>
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
