"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

import { UserCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

import InputComponent from "@/src/components/ui/Input/Input";
import CheckboxComponent from "@/src/components/ui/Checkbox/Checkbox";
import { KeyIcon } from "@heroicons/react/24/solid";
import { authenticate } from "@/src/actions/auth";

export const LoginForm = () => {

  const [state, dispatch] = useFormState(authenticate, undefined);

  console.log(state);

  useEffect(() => {
    if (state === "Success") {
      window.location.replace("/dashboard");
    }
  }, [state]);

  const [recordar,setRecordar]=useState(false)

  return (
    <form
      action={dispatch}
      className="w-80 flex flex-col justify-center items-center  text-white"
    >
      <div className="flex flex-col gap-4 w-full">
        <InputComponent
          name="email"
          tipo="text"
          titulo="Usuario"
          placeholder="Ingresar usuario"
          icon={<UserCircleIcon className="h-5 text-black" />}
          icon1={"hidden"}
        ></InputComponent>
        <InputComponent
          name="Contrasena"
          tipo="pass"
          titulo="Clave"
          placeholder="Ingresar clave"
          icon={<KeyIcon className="h-5 text-black" />}
          icon1={""}
        ></InputComponent>
      </div>
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {state === "CredentialsSignin" && (
          <div className="flex flex-row mb-2">
            <UserCircleIcon className="h-5 w-5 text-white" />
            <p className="text-sm text-white">
              Credenciales no son correctas
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-6">
        <div className="flex items-center justify-between w-full">
          <CheckboxComponent texto="Recordar clave" isSelected={recordar} onValueChange={setRecordar}/>
          <Link href="/auth/recuperar-clave">No recuerdas tu clave?</Link>
        </div>
        <div className="flex flex-col align-center items-center gap-3">
          <LoginButton></LoginButton>
          <CreateButton></CreateButton>

        </div>
      </div>
    </form>
  );
};
function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={
        clsx({
          "btn-primary": !pending,
          "btn-disabled": pending,
        }) + `custom-btn bg-red-500 p-3 px-5 border-white border-1 border-opacity-40  rounded-2xl`
      }
      disabled={pending}
    >
      Iniciar Sesion
    </button>
  );
}
function CreateButton() {
  const { pending } = useFormStatus();

  return (
    <Link href="/auth/registrarse">
    <button
      className={
        clsx({
          "btn-primary": !pending,
          "btn-disabled": pending,
        }) + `custom-btn bg-red-500 p-3 px-6 border-white border-1 border-opacity-40  rounded-2xl`
      }
      disabled={pending}
    >
      Registrarse
    </button>
    </Link>
  );
}