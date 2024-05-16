"use client";
import { BreadcrumbComponent } from "@/src/components/ui/Breadcrumb/Breadcrumb";
import NavbarPage from "./Navbar";
import { Sidebar } from "./Sibebar";
import { useEffect, useState } from "react";
import clsx from "clsx";
import NavbarMobile from "./NavbarBottomMobile";
import NavbarTopMobile from "./NavbarTopMobile";

interface Props {
  children: React.ReactNode;
  nombreusuario: string;
}

export default function LayoutDashComponent({
  children,
  nombreusuario,
}: Props) {
  const [mobile, setMobile] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [issidebarcollapsedmobile, setIsSidebarCollapsedMobile] =
    useState(false);

  useEffect(() => {
    if (window.innerWidth >= 650) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, []);

  return (
    <>
      <div
        className={clsx(
          "max-sm:hidden flex flex-col absolute top-0 bottom-0 left-0 z-[1] h-full  transition-width duration-500 ease-in-out",
          isSidebarCollapsed ? "w-[18rem] " : "w-[10rem] ",
          issidebarcollapsedmobile ? "!block !z-[100] bg-red-500" : ""
        )}
      >
        <Sidebar
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          issidebarcollapsedmobile={issidebarcollapsedmobile}
          onToggleSidebarMobile={() =>
            setIsSidebarCollapsedMobile(!issidebarcollapsedmobile)
          }
        />
      </div>
      <div
        className={clsx(
          isSidebarCollapsed ? "sm:pl-[18rem]" : "sm:pl-[10rem]",
          "pl-[0rem] p-0 sm:p-3 h-full transition-padding-left duration-500 ease-in-out"
        )}
      >
        <div
          className="w-full h-full bg-cover rounded-2xl  max-sm:rounded-none flex flex-col gap-5 bg-[image:var(--dashboard-bg)]
            before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-screen "
        >
          <div className="bg-[var(--dashboard-Dash)] h-full w-full flex flex-col p-2 gap-3 overflow-hidden relative rounded-2xl max-sm:rounded-none backdrop-filter blur-1 font-semibold text-base">
            {mobile ? (
              <NavbarPage
                nombreusuario={nombreusuario}
                issidebarcollapsedmobile={issidebarcollapsedmobile}
                onToggleSidebarMobile={() =>
                  setIsSidebarCollapsedMobile(!issidebarcollapsedmobile)
                }
              />
            ) : (
              <NavbarTopMobile
                nombreusuario={nombreusuario}
                issidebarcollapsedmobile={issidebarcollapsedmobile}
                onToggleSidebarMobile={() =>
                  setIsSidebarCollapsedMobile(!issidebarcollapsedmobile)
                }
              />
            )}
            <div className="bg-[var(--dashboard-Dash1)] h-[92%] overflow-auto p-3 flex flex-col gap-4 rounded-2xl max-sm:rounded-none ">
              <BreadcrumbComponent />
              {children}
            </div>
            {mobile ? (
              <></>
            ) : (
              <NavbarMobile
                nombreusuario={nombreusuario}
                issidebarcollapsedmobile={issidebarcollapsedmobile}
                onToggleSidebarMobile={() =>
                  setIsSidebarCollapsedMobile(!issidebarcollapsedmobile)
                }
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
