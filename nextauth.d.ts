import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      IdUsuario:number,
      Usuario:string,
      password:string,
      Correo:string,
      Telefono:string,
      FcIngreso:string,
      FcBaja:string | null,
    } & DefaultSession["user"];
  }
}
