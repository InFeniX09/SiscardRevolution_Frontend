import Image from "next/image";
import { NavbarPage } from "./ui/Navbar";
import { Sidebar } from "./ui/Sibebar";
import { BreadcrumbComponent } from "@/src/components/ui/Breadcrumb/Breadcrumb";

export default function Dashboard1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        className="relative bg-cover bg-center flex justify-center items-center flex-col w-full h-screen
        before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-screen before:backdrop-saturate-200 before:bg-[image:var(--dashboard-Layer)]"
        style={{ backgroundImage: "url('/dashboard/FondoInicioPeru.png')" }}
      >
        <div className="bg-[var(--dashboard-Dash)] max-w-[90rem] max-h-[90rem] h-[95vh] w-[95%] flex flex-col overflow-hidden relative rounded-3xl backdrop-filter blur-1 font-semibold text-base">
          <div className="absolute top-0 bottom-0 left-0 z-[1030] h-full w-[18rem] transition-width duration-500 ease-in-out">
            <Sidebar />
          </div>
          <div className="flex flex-col gap-5 pl-[19rem] p-3 h-full transition-padding-left duration-500 ease-in-out">
            <div
              className="w-full h-full bg-cover rounded-2xl "
              style={{
                backgroundImage: "url('/dashboard/FondoInicioPeru.png')",
              }}
            >
              <NavbarPage />
              <div className="bg-[var(--dashboard-Dash)]  h-[92%] overflow-auto p-3 flex flex-col gap-4">
                <BreadcrumbComponent />
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
