"use client";
import { Bars4Icon } from "@heroicons/react/24/solid";
import classes from "./index.module.css";
import { Link } from "@nextui-org/react";
import ButtonComponent from "@/src/components/ui/Button/Button";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className={classes.Topbar_menu}>
        <Bars4Icon className="h-7" />
      </div>
      <div className={classes.Topbar}>
        <div>
          <strong className={classes.Topbar_title}>SISCARD</strong>
        </div>
        <div className={classes.Topbar_options}>
          <p>Inicio</p>
          <p>Contactanos</p>
          <p>Proyectos</p>
        </div>
        <div className={classes.Topbar_button}>
          <Link href="/auth/iniciar-sesion">
            <ButtonComponent texto="Iniciar Sesion"/>
          </Link>
          <Link href="/auth/crear-cuenta">
            <ButtonComponent texto="Registrarse"/>
          </Link>
        </div>
      </div>
      {children}
    </>
  );
}
