import InputComponent from "@/src/components/ui/Input/Input";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import classes from "../index.module.css";
import CheckboxComponent from "@/src/components/ui/Checkbox/Checkbox";
import { KeyIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <form action="/dashboard" className={classes.Form_sesion}>
        <div className={classes.Inputs}>
          <InputComponent
            tipo="text"
            titulo="Usuario"
            placeholder="Ingresar usuario"
            icon={<UserCircleIcon className="h-5 text-black" />}
            icon1={"hidden"}
          ></InputComponent>
          <InputComponent
            tipo="pass"
            titulo="Clave"
            placeholder="Ingresar clave"
            icon={<KeyIcon className="h-5 text-black" />}
            icon1={""}
          ></InputComponent>
        </div>
        <div className={classes.Actions}>
          <div className={classes.Actions_clave}>
            <CheckboxComponent texto="Recordar clave" />
            <Link href="auth/recuperar-clave">No recuerdas tu clave?</Link>
          </div>
          <button className="custom-btn btn-11">Ingresar</button>
        </div>
      </form>
    </>
  );
}
