import { Image } from "@nextui-org/react";
import { Bars4Icon } from "@heroicons/react/24/solid";
import classes from "./index.module.css";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className={classes.Topbar_menu}>
        <Bars4Icon className="h-7" />
      </div>
      <section className={classes.Part_1}>
        <div className={classes.Topbar}>
          <div>
            <strong className={classes.Topbar_title}>SISCARD</strong>
          </div>
          <div className={classes.Topbar_options}>
            <p>Inicio</p>
            <p>Contactanos</p>
            <p>Proyectos</p>
          </div>
          <div></div>
        </div>

        <div className={classes.Welcome}>
          <h4 className={classes.Text_1}>BIENVENIDO A</h4>
          <h1 className={classes.Text_2}>SISCARD PERÚ</h1>
        </div>

        <div className={classes.Cards_nation}>
          <div className={classes.Card_nation}>
            <Image
              src={"/inicio/banderaperu.png"}
              className={classes.Card_img}
            />
            <div>
              <h1>Perú</h1>
              <p>Ciudad Lima</p>
            </div>
          </div>
          <div className={classes.Card_nation}>
            <Image
              src={"/inicio/banderaargentina.png"}
              className={classes.Card_img}
            />
            <div>
              <h1>Argentina</h1>
              <p>Ciudad Cordova</p>
            </div>
          </div>
          <div className={classes.Card_nation}>
            <Image
              src={"/inicio/banderacolombia.png"}
              className={classes.Card_img}
            />
            <div>
              <h1>Colombia</h1>
              <p>Ciudad Medellin</p>
            </div>
          </div>
        </div>
        {children}
      </section>
    </main>
  );
}
