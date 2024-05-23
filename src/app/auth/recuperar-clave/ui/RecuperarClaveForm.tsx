"use client";
import InputComponent from "@/src/components/ui/Input/Input";
import { SocketContext } from "@/src/context/SocketContext";
import { Button } from "@nextui-org/react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function RecuperarClaveForm() {
  const { socket } = useContext(SocketContext);
  const [fase, setFase] = useState(1);
  const [email, setEmail] = useState("");

  //-------------------------
  //Formularios
  //-------------------------

  const {
    register: rRecuperaClave,
    handleSubmit: fRecuperaClave,
    reset,
  } = useForm();

  const actionRecuperaClave = async (dato: any) => {
   
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Desea enviar la recuperación de correo?",
      text: "Se enviará un correo con el token de recuperación.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, proceder!",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        setEmail(dato.Email);
        setFase(2);
        reset();
        socket?.emit("recuperar-clave", dato, (datospdf: any) => {
          console.log(datospdf);
        });
        Swal.fire({
          title: "Se envio con exito el correo!",
          text: "Revisa tu correo y coloca el token en el campo indicado.",
          icon: "success",
        });
      }
    });
  };

  const {
    register: rTokenRecuperacionClave,
    handleSubmit: fTokenRecuperacionClave,
  } = useForm();

  const actionTokenRecuperacionClave = async (dato: any) => {
    const data = {
      Email: email,
      Token: dato.Token,
    };
    socket?.emit("recuperacion-clavetoken", data, (clavetoken: any) => {
      if (clavetoken === "Existe") {
        Swal.fire({
          icon: "success",
          title: "El token esta correctamente verificado",
          text: "LLego la hora de cambiar su clave!",
        }).then(() => {
          setFase(3);
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "El token no es correcto",
          text: "Coloque un token correcto!",
        });
      }
    });
  };

  const { register: rCambioClave, handleSubmit: fCambioClave } = useForm();

  const actionCambioClave = async (dato: any) => {
    if (dato.Clave1 === dato.Clave2) {
      const data = {
        Email: email,
        Clave: dato.Clave1,
      };
      socket?.emit("cambio-clave", data, (cambioclave: any) => {
        if (cambioclave === "Existe") {
          Swal.fire({
            icon: "success",
            title: "Clave cambiada con exito",
            text: "Ahora puede iniciar sesión con su nueva clave!",
          }).then(() => {
            window.location.replace("/auth/iniciar-sesion");
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error al cambiar la clave",
            text: "Intente de nuevo!",
          });
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Las claves no coinciden",
        text: "Coloque claves iguales!",
      });
    }
  };
  return (
    <>
      {fase === 1 && (
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
      )}
      {fase === 2 && (
        <form className="flex flex-col gap-3">
          <p className="text-[var(--color-contraneutral)]">
            Introducir el token generado en tu correo
          </p>
          <InputComponent
            tipo="text"
            titulo="Token Generado"
            placeholder=""
            icon
            icon1={"hidden"}
            prop={{ ...rTokenRecuperacionClave(`Token`) }}
          />
          <Button
            type="button"
            onClick={fTokenRecuperacionClave(actionTokenRecuperacionClave)}
            color="danger"
          >
            Procesar
          </Button>
        </form>
      )}
      {fase === 3 && (
        <form className="flex flex-col gap-3">
          <p className="text-[var(--color-contraneutral)]">Cambie su clave</p>
          <InputComponent
            tipo="pass"
            titulo="Nueva clave"
            placeholder="Ingresar nueva clave"
            icon
            icon1={"hidden"}
            prop={{ ...rCambioClave(`Clave1`) }}
          />
          <InputComponent
            tipo="pass"
            titulo="Confirmación de clave"
            placeholder="Confirmar la clave"
            icon
            icon1={"hidden"}
            prop={{ ...rCambioClave(`Clave2`) }}
          />

          <Button
            type="button"
            onClick={fCambioClave(actionCambioClave)}
            color="danger"
          >
            Cambiar clave
          </Button>
        </form>
      )}
    </>
  );
}
