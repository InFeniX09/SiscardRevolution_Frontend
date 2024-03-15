import Image from "next/image";
import { NavbarPage } from "./ui/Navbar";
import { Sidebar } from "./ui/Sibebar";
import { BreadcrumbComponent } from "@/src/components/ui/Breadcrumb/Breadcrumb";
import { redirect } from "next/navigation";
/*import { auth } from "@/src/auth.config";*/

export default async function Dashboard1Layout({
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
        <div className="bg-[var(--dashboard-Dash)] max-w-[95rem] max-h-[95rem] h-[95vh] w-[95%] flex flex-col overflow-hidden relative rounded-3xl backdrop-filter blur-1 font-semibold text-base">
          <Sidebar />
          <div className="pl-[18rem] p-3 h-full transition-padding-left duration-500 ease-in-out">
            <div
              className="w-full h-full bg-cover rounded-2xl  flex flex-col gap-5 bg-[image:var(--dashboard-bg)]
            before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-screen "
            >
              <div className="bg-[var(--dashboard-Dash)] h-full w-full flex flex-col p-2 gap-3 overflow-hidden relative rounded-2xl backdrop-filter blur-1 font-semibold text-base">
                <NavbarPage />
                <div className="bg-[var(--dashboard-Dash1)] h-[92%] overflow-auto p-3 flex flex-col gap-4 rounded-2xl">
                  <BreadcrumbComponent />
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
