'use server'
import axios from "axios";
import { environment } from "@/src/environments/environment";

const api = axios.create({
  baseURL: environment.baseUrl,
});
export const getlistarTicketEstadoxFecha = async (dia:number) => {
    const response = await api.get(`/centro-atencion/listarTicketEstadoxFecha?DiasAtras=${dia}`);
    return response.data;
  };