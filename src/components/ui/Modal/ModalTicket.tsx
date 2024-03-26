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
import { useFormState } from "react-dom";
import {
  getlistarArea,
  getlistarPrioridad,
  getlistarTicket,
} from "@/src/actions/centro-atencion";
import { Ticket } from "@/src/interfaces";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "@/src/auth.config";

interface Props {
  userData: Ticket[]; // Define la interfaz para userData
  updateUserData: (newData: Ticket[]) => void; // Define la interfaz para updateUserData
}

export default function ModalTicketComponent({
  userData,
  updateUserData,
}: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [state, dispatch] = useFormState(createTicketclient, undefined);
  console.log(state);

  useEffect(() => {
    if (state === "Success") {
      console.log("aea");
      onOpenChange();
      getlistarTicket()
        .then((newData) => {
          updateUserData(newData);
        })
        .catch((error) => console.error("Error fetching data:", error));
      toast("Ticket Creado");
    }
  }, [state]);

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
              <form action={dispatch} className="h-full overflow-hidden">
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

async function createTicketclient(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    /*
    const session = await auth();

    const { Asunto, Descripcion, Area, Prioridad } = Object.fromEntries(
      formData
    ) as {
      Asunto?: string;
      Descripcion?: string;
      Area?: number;
      Prioridad?: number;
    };

    // Obtener los valores de Ticketcc como un array
    const ticketccValues = formData.getAll("Ticketcc");

    console.log('Valor de "Area":', Area || "");
    console.log('Valor de "Prioridad":', Prioridad || "");
    console.log('Valores de "Ticketcc":', ticketccValues);

   
    // Llamar a createTicket con los argumentos correctos
    createTicket(
      Asunto || "",
      Descripcion || "",
      session?.user.IdUsuario || 0,
      Area || 0,
      0,
      Prioridad || 0
    );*/

    console.log("pavita");

    return "Success";
  } catch (error) {
    console.log(error);
    return "Error";
  }
}
