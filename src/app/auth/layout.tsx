import ImageComponent from "@/src/components/ui/Image/Image";
import classes from "./index.module.css";

const data = [{ srcimg: "/auth/FondoPeru.png" }];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className={classes.Layer_image}>
        {data.map((item, index) => (
          <ImageComponent key={index} srcimg={item.srcimg}></ImageComponent>
        ))}
      </div>
      <div className={classes.Layer_1}>
        <div className={classes.Layer_2}>
          <div className={`btn-11 `+classes.Layer_Bandera}>
            <ImageComponent srcimg="/inicio/BanderaPeru.png"></ImageComponent>
          </div>
          {children}
          
        </div>
      </div>
    </>
  );
}
