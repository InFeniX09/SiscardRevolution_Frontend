"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import clsx from "clsx";
import InputComponent from "@/src/components/ui/Input/Input";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import classes from "../../index.module.css";
import CheckboxComponent from "@/src/components/ui/Checkbox/Checkbox";
import { KeyIcon } from "@heroicons/react/24/solid";
import { authenticate } from "@/src/actions/auth/buscar-usuario";

export const LoginForm = () => {
  // const router = useRouter();
  const [state, dispatch] = useFormState(authenticate, undefined);

  console.log(state);
  console.log(dispatch);


  useEffect(() => {
    if (state === "Success") {
      // redireccionar
      // router.replace('/');
      window.location.replace("/");
    }
  }, [state]);
  return (
    <form action={dispatch} className={classes.Form_sesion}>
      <div className={classes.Inputs}>
        <InputComponent
          name="email"
          tipo="text"
          titulo="Usuario"
          placeholder="Ingresar usuario"
          icon={<UserCircleIcon className="h-5 text-black" />}
          icon1={"hidden"}
        ></InputComponent>
        <InputComponent
          name="password"
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
            <UserCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">
              Credenciales no son correctas
            </p>
          </div>
        )}
      </div>
      <div className={classes.Actions}>
        <div className={classes.Actions_clave}>
          <CheckboxComponent texto="Recordar clave" />
          <Link href="auth/recuperar-clave">No recuerdas tu clave?</Link>
        </div>
        <LoginButton></LoginButton>
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
        }) + `custom-btn`
      }
      disabled={pending}
    >
      Ingresar
    </button>
  );
}
