//Manejar estados
import React, { useEffect, useState } from "react";
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


export default function ModalTicketComponent() {
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

  const onSubmit: SubmitHandler<Ticket> = async (data) => {
    const { Asunto, Descripcion, idTicketcc, idArea, idPrioridad } = data;

    console.log(Asunto, Descripcion, idTicketcc, idArea, idPrioridad);
    onOpenChange();
    toast("Ticket Creado");

  };
  const handleSelectChange = async () => {
    
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
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="h-full overflow-hidden"
              >
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
                  <SelectComponent
                    array={area}
                    value="IdArea"
                    texts={["Area"]}
                    label="Area designada"
                    placeholder="escoge un area"
                    prop={{ ...register("idArea", { required: true }) }}
                    onSelectChange={handleSelectChange}

                  />
                  <SelectComponent
                    array={prioridad}
                    value="IdPrioridad"
                    texts={["Prioridad"]}
                    label="Prioridad"
                    placeholder="seleccione la prioridad"
                    prop={{ ...register("idPrioridad", { required: true }) }}
                    onSelectChange={handleSelectChange}

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
