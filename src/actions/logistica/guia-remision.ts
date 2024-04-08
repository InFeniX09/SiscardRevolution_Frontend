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

export const getlistarAlbaranSalidaxZona = async (zona_id:string) => {
  const response = await api.post("/logistica/listarAlbaranSalidaxZona", {
    zona_id:zona_id
  });
  return response.data;
};

export const getlistarDetalleAlbaranSalida = async (palbaran_id:string) => {
  const response = await api.post("/logistica/listarDetalleAlbaranSalida", {
    palbaran_id:palbaran_id
  });
  return response.data.Query3;
};

export const getlistarDatosPdfAlbaranSalida= async (palmacen_id:string) => {
  const response = await api.post("/logistica/listarDatosPdfAlbaranSalida", {
    palmacen_id:palmacen_id
  });
  return response.data.Query3;
};

export const generarpdf = async (pdatos:any,pdetalle:any) => {
  const response = await api.post("/logistica/generar-pdf",{
    pdatos:pdatos,
    pdetalle:pdetalle
  }, { responseType: "arraybuffer" });
  return response.data;
};