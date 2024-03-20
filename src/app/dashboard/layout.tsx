import { redirect } from "next/navigation";
import LayoutDashComponent from "./ui/LayoutDash";
import { auth } from "@/src/auth.config";

export default async function Dashboard1Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await auth();
  console.log('1'+JSON.stringify(session))
  console.log('2'+JSON.stringify(session?.user))

 if ( session?.user === null || session?.user === undefined) {
    redirect('/');
  }
  
  console.log("Paso 3 Usuario iniciado" + JSON.stringify(session))
  
  return (
    <>
      <div
        className="relative bg-cover bg-center flex justify-center items-center flex-col w-full h-screen
        before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-screen before:backdrop-saturate-200 before:bg-[image:var(--dashboard-Layer)]"
        style={{ backgroundImage: "url('/dashboard/FondoInicioPeru.png')" }}
      >
        <div className="bg-[var(--dashboard-Dash)] max-w-[95rem] max-h-[95rem] h-[95vh] w-[95%] flex flex-col overflow-hidden relative rounded-3xl backdrop-filter blur-1 font-semibold text-base">
          <LayoutDashComponent >{children}</LayoutDashComponent>
        </div>
      </div>
    </>
  );
}
