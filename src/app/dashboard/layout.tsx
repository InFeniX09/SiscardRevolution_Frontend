import { redirect } from "next/navigation";
import { auth } from "@/src/auth.config";
import LayoutDashComponent from "./ui/LayoutDash";

export default async function Dashboard1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user === null || session?.user === undefined) {
    redirect("/");
  
  }

  return (
    <>
      <div
        className="relative bg-cover bg-center flex justify-center items-center flex-col w-full h-screen
        before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-screen before:backdrop-saturate-200  bg-[image:var(--dashboard-bg)]"
      >
        <div className="bg-[var(--colorblur-contraneutral)] h-[97vh] w-[97vw] flex flex-col  relative rounded-3xl backdrop-filter 
        blur-1 font-semibold text-base border-[var(--colorblur-contraneutral)] border-1">
          <LayoutDashComponent nombreusuario={session?.user.Usuario}>
            {children}
          </LayoutDashComponent>
        </div>
      </div>
    </>
  );
}
