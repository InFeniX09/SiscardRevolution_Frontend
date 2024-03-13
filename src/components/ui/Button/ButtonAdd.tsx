import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { animals, getlistarMarca } from "@/src/actions/auth/buscar-usuario";
import axios from "axios";
import { environment } from '@/src/environments/environment'

type User = {
  IdTicket: number;
  Titulo: string;
  Descripcion: string;
  idUsuario: number;
};

interface AddTicketProps {
  userData: User[];
  updateUserData: (newData: User[]) => void;
}

export const ButtonAddComponent: React.FC<AddTicketProps> = ({
  userData,
  updateUserData,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({
    Titulo: "",
    Descripcion: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Handle file and other input types
    }));
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${environment}/centro-atencion/crearTicket`,
        formData
      );
      console.log("Ticket created successfully:", data);
      onOpenChange();

      getlistarMarca()
        .then((newData) => updateUserData(newData)) // updateUserData comes from props
        .catch((error) => console.error("Error fetching data:", error));
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  return (
    <div>
      <>
        <Button onPress={onOpen} color="primary">
          Crear Ticket
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Crear Ticket
                </ModalHeader>
                <ModalBody>
                  <Input
                    label="Titulo"
                    variant="bordered"
                    name="Titulo"
                    onChange={handleChange}
                  />
                  <Textarea
                    label="Descripcion"
                    placeholder="Enter your description"
                    name="Descripcion"
                    onChange={handleChange}
                    className="max-w-xs"
                  />
                  <Select
                    label="Seleccionar Area"
                    className="max-w-xs"
                    name="area"
                  >
                    {animals.map((animal) => (
                      <SelectItem key={animal.value} value={animal.value}>
                        {animal.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <Input
                    type="file"
                    variant="bordered"
                    name="file"
                    onChange={handleChange}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={onClose}>
                    Cerrar
                  </Button>
                  <Button color="primary" onPress={handleSubmit}>
                    Guardar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
