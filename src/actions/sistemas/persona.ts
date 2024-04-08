"use server";
import axios from "axios";
import { environment } from "@/src/environments/environment";

const api = axios.create({
  baseURL: environment.baseUrl,
  headers: { "Content-Type": "application/json" },
});

export const listarEntidad = async () => {
    const response = await api.get("/auth/listarEntidad");
    return response.data.Query3;
  };