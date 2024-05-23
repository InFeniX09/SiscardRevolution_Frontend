"use client";
import InputComponent from "@/src/components/ui/Input/Input";
import { SocketContext } from "@/src/context/SocketContext";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";
import { useContext } from "react";
import { useForm } from "react-hook-form";

export default function RecuperarClaveForm() {
  const { socket } = useContext(SocketContext);

  //-------------------------
  //Formularios
  //-------------------------

  const { register: rRecuperaClave, handleSubmit: fRecuperaClave } = useForm();

  const actionRecuperaClave = async (dato: any) => {
    const data={
        email:dato.Email,
        html:""
    }

    socket?.emit("enviarcorreo", data, (datospdf: any) => {
        
      console.log(datospdf);

    });

  };

  return (
    <>
      <form className="flex flex-col gap-3">
        <p className="text-[var(--color-contraneutral)]">
          Introducir el correo del usuario
        </p>
        <InputComponent
          tipo="text"
          titulo="Correo Electronico"
          placeholder=""
          icon
          icon1={"hidden"}
          prop={{ ...rRecuperaClave(`Email`) }}
        />
        <Button
          type="button"
          onClick={fRecuperaClave(actionRecuperaClave)}
          color="danger"
        >
          Enviar Correo
        </Button>
      </form>
    </>
  );
}
