"use server";
import axios from "axios";
import { environment } from "@/src/environments/environment";
import { Menu } from "../interfaces";

const api = axios.create({
  baseURL: environment.baseUrl,
  headers: { "Content-Type": "application/json" },
});

export const getlistarMenuxUsuarioxPerfil = async (
  idUsuario: number,
  idPerfil: number
) => {
  const response = await api.get(
    `/menu/listarMenuxUsuarioxPerfil?idUsuario=${idUsuario}&idPerfil=${idPerfil}`
  );
  return response.data;
};
