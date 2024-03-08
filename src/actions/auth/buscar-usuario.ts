import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3100",
});

export const getbuscarUsuario = async () => {
    const response = await api.get("/inventario-departamental/buscarUsuario");
    return response.data.Query3;
  };