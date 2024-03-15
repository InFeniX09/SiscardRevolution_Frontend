"use server";

import { signIn } from "@/src/app/auth.config";
import axios from "axios";
import { environment } from "@/src/environments/environment";
const api = axios.create({
  baseURL: environment.baseUrl,
  headers:{"Content-Type": "application/json" },
});
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    // await sleep(2);
    console.log(
      "formulario2:",
      JSON.stringify({ ...Object.fromEntries(formData), redirect: false })
    );

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

export const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", { email, password });

    return { ok: true };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo iniciar sesión",
    };
  }
};

export const getbuscarUsuario = async (email: string) => {
  const response = await api.get(`/auth/buscarUsuario?pUsuario=${email}`);
  return response.data.Query3;
};
