"use server"
import { signIn } from "@/src/auth.config";

export async function authenticate(prevState: any, formData: Iterable<readonly [PropertyKey, any]>) {
  try {
    console.log("baseeeeee",process.env.NEXTAUTH_URL);
    console.log("Entrando a authenticate");
    const data = Object.fromEntries(formData);
    console.log("Datos del formulario:", data);

    const result = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    console.log("Resultado de signIn:", result);

    if (result?.error) {
      console.log("Error en la autenticación:", result.error);
      return "CredentialsSignin";
    }

    return "Success";
  } catch (error) {
    console.error("Error en authenticate:", error);
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
