"use server"
import { signIn } from "@/src/auth.config";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    console.log("vamos en authenticate")
    console.log(formData);

    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return "Success";
  } catch (error) {
    console.log(error);
    console.log("error")
    return "CredentialsSignin";
  }
}
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
