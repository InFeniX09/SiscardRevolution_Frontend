"use client";
import classes from "./index.module.css";
import { Image } from "@nextui-org/react";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  return (
    <>
      <section className={classes.Part_1}>
          <div></div>
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
      </section>
      <section className={classes.Part_1}>
          <div>dasdasd</div>
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
      </section>
      <section className={classes.Part_1}>
          <div></div>
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
      </section>
    </>
  );
}
