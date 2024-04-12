import SelectComponent from "@/src/components/ui/Select/Select";
import SelectNormalComponent from "@/src/components/ui/Select/SelectNormal";
import { SocketContext } from "@/src/context/SocketContext";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
interface Props {
  tiposolicitud: any;
}

export default function FormSolicitud({ tiposolicitud }: Props) {
  const { data: session } = useSession();
  const { socket } = useContext(SocketContext);
  const [tipomotivo, setTipoMotivo] = useState([]);
  const [selecttiposolicitud, setSelectTipoSolicitud] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (dato: any) => {
    console.log("from activo");
    const { tipomotivo } = dato;
    const DeUsuario_id = session?.user.IdUsuario;
    const data = {
      TipoSolicitud_id: selecttiposolicitud,
      TipoMotivo_id: tipomotivo,
      Usuario_id: DeUsuario_id,
    };
    socket?.emit("crear-solicitud", data, (respuesta: any) => {
      if (respuesta === "si") {
        console.log("Se creo");
      } else {
        console.log("NO creo");
      }
    });
  };

  const handleSelectChange = async (selectedValue: string) => {
    try {
      setSelectTipoSolicitud(selectedValue);
      const data = {
        TipoSolicitud_id: selectedValue,
      };
      socket?.emit("listar-tipomotivo", data, (tipomotivo: any) => {
        console.log(tipomotivo);
        setTipoMotivo(tipomotivo);
        console.log("yupi", tipomotivo);
      });
    } catch (error) {
      console.error("Error fetching radiogroup data:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="h-full">
        <SelectComponent
          array={tiposolicitud}
          value="IdTipoSolicitud"
          texts={["TipoSolicitud"]}
          label="Solicitud"
          placeholder="Seleccione una solicitud"
          prop={{}}
          onSelectChange={handleSelectChange}
        />
        <SelectNormalComponent
          array={tipomotivo}
          value="IdTipoMotivo"
          texts={["TipoMotivo"]}
          label="Motivo"
          placeholder="Seleccione un motivo"
          prop={{ ...register("tipomotivo", { required: true }) }}
        />

        <button className="w-full h-full bg-blue-900 text-white" type="submit">
          Enviar
        </button>
      </form>
    </>
  );
}
