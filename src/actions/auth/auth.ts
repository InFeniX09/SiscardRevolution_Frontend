"use server";
import {  auth, signIn } from "@/src/auth.config";
import { createTicket } from "./centro-atencion";



export const login = async (email: string, Contrasena: string) => {
  try {
    await signIn("credentials", { email, Contrasena });

    return { ok: true };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo iniciar sesión",
    };
  }
};


export async function createTicketclient(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const session = await auth();
    
    const { Asunto, Descripcion, Area, Prioridad } = Object.fromEntries(formData) as {
      Asunto?: string;
      Descripcion?: string;
      Area?: number;
      Prioridad?: number;
    };

    // Obtener los valores de Ticketcc como un array
    const ticketccValues = formData.getAll('Ticketcc');

    console.log('Valor de "Area":', Area || "");
    console.log('Valor de "Prioridad":', Prioridad || "");
    console.log('Valores de "Ticketcc":', ticketccValues);

    // Llamar a createTicket con los argumentos correctos
    const a = await createTicket(Asunto || "", Descripcion || "", session?.user.IdUsuario || 0, Area || 0, 0, Prioridad || 0);

    return "Success";
  } catch (error) {
    console.log(error);
    return "Error";
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    console.log(formData);

    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return "Success";
  } catch (error) {
    console.log(error);
    return "CredentialsSignin";
  }
}
