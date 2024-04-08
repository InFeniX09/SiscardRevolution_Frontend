import { Bars4Icon } from "@heroicons/react/24/solid";
import ButtonComponent from "@/src/components/ui/Button/Button";
import Link from "next/link";
import ButtonNormalComponent from "@/src/components/ui/Button/ButtonNormal";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-gray-700 fixed text-white right-0 top-0 p-4 rounded-l-full z-10 hidden ">
        <Bars4Icon className="h-7" />
      </div>
      <div className="flex items-center justify-between w-full fixed text-white py-4 px-8 bg-black bg-opacity-80 border-b border-white z-11">
        <div>
          <strong className="text-xl tracking-[3.5px]">SISCARD</strong>
        </div>
        <div className="gap-12 hidden md:flex sm:hidden">
          <p>Inicio</p>
          <p>Contactanos</p>
          <p>Proyectos</p>
        </div>
        <div className="flex gap-4">
          <Link href="/auth/iniciar-sesion">
            <ButtonNormalComponent
              texto="Iniciar Sesion"
            />
          </Link>
          <Link href="/auth/crear-cuenta">
            <ButtonNormalComponent
              texto="Registrarse"
            />
          </Link>
        </div>
      </div>
      {children}
    </>
  );
}
