import classes from "./index.module.css";
import { useState } from "react";
export default function Dashboard1Layout({
  children 
}: {
  children: React.ReactNode;
}) {

  return (
    <main className={classes.Layer_1}>
      <div className={classes.Layer_2}>
        <div className={classes.Dash}>
          <div className={classes.Left_side}>

          </div>
          <div className={classes.Right_side}>
            
          </div>
        </div>
      </div>
    </main>
  );
}
