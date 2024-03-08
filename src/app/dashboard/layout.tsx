import Image from "next/image";
import classes from "./index.module.css";
import { NavbarPage } from "./ui/Navbar";
import { Sidebar } from "./ui/Sibebar";

export default function Dashboard1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className={classes.Layer_1}>
        <div className={classes.Dash}>
          <div className={classes.Left_side}>
            <Sidebar />
          </div>
          <div className={classes.Right_side}>
            <NavbarPage />
            <div className={classes.Content}>
            {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
