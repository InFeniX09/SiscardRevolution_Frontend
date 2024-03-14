import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { z } from "zod";
import axios from "axios";
import { environment } from "@/src/environments/environment";
import { getbuscarUsuario} from "@/src/actions/auth/buscar-usuario"
const api = axios.create({
  baseURL: environment.baseUrl,
});

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/nueva-cuenta",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log({ auth });
      // const isLoggedIn = !!auth?.user;

      // const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      // if (isOnDashboard) {
      //   if (isLoggedIn) return true;
      //   return false; // Redirect unauthenticated users to login page
      // } else if (isLoggedIn) {
      //   return Response.redirect(new URL('/dashboard', nextUrl));
      // }
      return true;
    },

    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }

      return token;
    },

    session({ session, token, user }) {
      session.user = token.data as any;
      return session;
    },
  },

  providers: [
    Credentials({
      async authorize(credentials) {
        console.log("parte 1" + JSON.stringify(credentials));

        const parsedCredentials = z
          .object({ email: z.string(), password: z.string() })
          .safeParse(credentials);
        console.log("parte 2" + JSON.stringify(parsedCredentials));

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;
        console.log("parte 2" + email, password);

        // Buscar el correo

        const user = await getbuscarUsuario(email);

        console.log("parte 4" + JSON.stringify(user));

        if (!user) return null;
        console.log("parte 5" + user);

        console.log("parte 6" + "" + password + "" + user.Contrasena);

        // Comparar las contraseñas
        // if (!bcryptjs.compareSync(password, '$2a$10$1vR8Pw13u1oRACoNUeOucuJJ/rN.xhGslJeWnkA8JNXH.5T1ILx5C')) return null;
        if (password!==user.Contrasena) return null;

        console.log("parte 7");

        // Regresar el usuario sin el password
        const { password: _, ...rest } = user;

        return rest;
      },
    }),
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
