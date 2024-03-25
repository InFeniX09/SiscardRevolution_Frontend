import axios from "axios";
import { environment } from "@/src/environments/environment";

const api = axios.create({
  baseURL: environment.baseUrl,
});

export const getlistarEquipo = async () => {
    const response = await api.get("/inventario-departamental/listarEquipo");
    return response.data.Query3;
  };
  export const getlistarEquipoStock = async () => {
    const response = await api.get("/inventario-departamental/listarEquipoStock");
    return response.data.Query3;
  };
  export const getlistarEquipoControl = async () => {
    const response = await api.get(
      "/inventario-departamental/listarEquipoControl"
    );
    return response.data.Query3;
  };
  export const getlistarEquipoDescuento = async () => {
    const response = await api.get(
      "/inventario-departamental/listarEquipoDescuento"
    );
    return response.data.Query3;
  };
  export const getlistarTipoEquipo = async () => {
    const response = await api.get("/inventario-departamental/listarTipoEquipo");
    return response.data.Query3;
  };