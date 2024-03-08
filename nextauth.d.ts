import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      IdUsuario:number,
      Usuario:string,
      Contrasena:string,
      Correo:string,
      Telefono:string,
      FcIngreso:string,
      FcBaja:string,
    } & DefaultSession["user"];
  }
}
