"use server";
import axios from "axios";
import { environment } from "@/src/environments/environment";

const api = axios.create({
  baseURL: environment.baseUrl,
  headers: { "Content-Type": "application/json" },
});

export const getlistarAlmacenxAlbaranSalida = async () => {
    const response = await api.get("/logistica/listarAlmacenxAlbaranSalida");
    return response.data.Query3;
  };