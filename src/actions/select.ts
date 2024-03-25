"use server";

import axios from "axios";
import { environment } from "@/src/environments/environment";
const api = axios.create({
  baseURL: environment.baseUrl,
  headers: { "Content-Type": "application/json" },
});

export const getlistarArea = async () => {
  const response = await api.get("/select/listarArea");
  return response.data.Query3;
};
export const getlistarPrioridad = async () => {
  const response = await api.get("/select/listarPrioridad");
  return response.data.Query3;
};
export const getlistarUsuario = async () => {
  const response = await api.get("/select/listarUsuario");
  return response.data.Query3;
};
