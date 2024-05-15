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
        before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-screen before:backdrop-saturate-200 before:bg-[image:var(--dashboard-Layer)] bg-[image:var(--dashboard-bg)]"
      >
        <div className="bg-[var(--dashboard-Dash)] max-w-[95rem] max-h-[95rem] h-[100vh] w-full sm:h-[95vh] sm:w-[95%] flex flex-col overflow-hidden relative rounded-3xl max-sm:rounded-none backdrop-filter blur-1 font-semibold text-base">
          <LayoutDashComponent nombreusuario={session?.user.Usuario}>
            {children}
          </LayoutDashComponent>
        </div>
      </div>
    </>
  );
}
