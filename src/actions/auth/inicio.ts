"use server";
import axios from "axios";
import { environment } from "@/src/environments/environment";
const api = axios.create({
  baseURL: environment.baseUrl,
  headers: { "Content-Type": "application/json" },
});

export const getbuscarUsuario = async (email: string) => {
  const response = await api.get(`/auth/buscarUsuario?pUsuario=${email}`);
  return response.data.Query3;
};

export interface GetUsuarioResponse {
  IdUsuario: number;
  Usuario: string;
  Contrasena: string;
  Correo: string;
  Telefono: string;
  FcIngreso: string;
  FcBaja: string | null;
}
