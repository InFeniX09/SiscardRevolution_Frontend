import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3100",
});


export const getlistarMarca = async (): Promise<Marca[]>  => {
  const response = await api.get("/inventario-departamental/listarMarca");
  return response.data.Query3 as Marca[];
};

interface Marca {
  IdMarca: number;
  Marca: string;
  TipoEquipo: string;
  Clasificacion: string;
  Estado: string;
}


export const getbuscarUsuario = async () => {
  const response = await api.get("/inventario-departamental/buscarUsuario");
  return response.data.Query3;
};
export const columnslistarMarca = [
  { name: "IdMarca", uid: "IdMarca", sortable: true },
  { name: "Marca", uid: "Marca", sortable: true },
  { name: "TipoEquipo", uid: "TipoEquipo", sortable: true },
  { name: "Clasificacion", uid: "Clasificacion", sortable: true },
  { name: "Estado", uid: "Estado", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

export const animals = [
  {
    label: "Sistemas",
    value: "cat",
    description: "The second most popular pet in the world",
  },
  {
    label: "Operaciones",
    value: "dog",
    description: "The most popular pet in the world",
  },
  {
    label: "Logistica",
    value: "elephant",
    description: "The largest land animal",
  },
];
/*
//inventario-departamental

export const getlistarModelo = async () => {
  const response = await api.get("/inventario-departamental/listarModelo");
  return response.data.Query3;
};
export const getlistarTipoEquipo = async () => {
  const response = await api.get("/inventario-departamental/listarTipoEquipo");
  return response.data.Query3;
};
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
//centro-atencion


export const columnslistarModelo = [
  { name: "IdModelo", uid: "IdModelo", sortable: true },
  { name: "Modelo", uid: "Modelo", sortable: true },
  { name: "Marca", uid: "Marca", sortable: true },
  { name: "TipoEquipo", uid: "TipoEquipo", sortable: true },
  { name: "Clasificacion", uid: "Clasificacion", sortable: true },
  { name: "Estado", uid: "Estado", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const columnslistarTipoEquipo = [
  { name: "IdTipoEquipo", uid: "IdTipoEquipo", sortable: true },
  { name: "TipoEquipo", uid: "TipoEquipo", sortable: true },
  { name: "Clasificacion", uid: "Clasificacion", sortable: true },
  { name: "Estado", uid: "Estado", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const columnslistarEquipo = [
  { name: "IdEquipo", uid: "IdEquipo", sortable: true },
  { name: "CodCliente", uid: "CodCliente", sortable: true },
  { name: "Marca", uid: "Marca", sortable: true },
  { name: "Modelo", uid: "Modelo", sortable: true },
  { name: "Especificacion", uid: "Especificacion", sortable: true },
  { name: "Estado", uid: "Estado", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const columnslistarEquipoStock = [
  { name: "IdEquipoStock", uid: "IdEquipoStock", sortable: true },
  { name: "CodCliente", uid: "CodCliente", sortable: true },
  { name: "Marca", uid: "Marca", sortable: true },
  { name: "Modelo", uid: "Modelo", sortable: true },
  { name: "Usuario", uid: "Usuario", sortable: true },
  { name: "StockActual", uid: "StockActual", sortable: true },
  { name: "StockDisponible", uid: "StockDisponible", sortable: true },
  { name: "StockNoDisponible", uid: "StockNoDisponible", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const columnslistarEquipoControl = [
  { name: "IdEquipoControl", uid: "IdEquipoControl", sortable: true },
  { name: "CodCliente", uid: "CodCliente", sortable: true },
  { name: "Marca", uid: "Marca", sortable: true },
  { name: "Modelo", uid: "Modelo", sortable: true },
  { name: "Serie", uid: "Serie", sortable: true },
  { name: "Identificacion", uid: "Identificacion", sortable: true },
  { name: "TiempoVida", uid: "TiempoVida", sortable: true },
  { name: "Proveedor", uid: "Proveedor", sortable: true },
  { name: "FcIngreso", uid: "FcIngreso", sortable: true },
  { name: "Usuario", uid: "Usuario", sortable: true },
  { name: "FcAsignado", uid: "FcAsignado", sortable: true },
  { name: "FcBaja", uid: "FcBaja", sortable: true },
  { name: "Estado", uid: "Estado", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const columnslistarEquipoDescuento = [
  { name: "IdEquipoDescuento", uid: "IdEquipoDescuento", sortable: true },
  { name: "Marca", uid: "Marca", sortable: true },
  { name: "Modelo", uid: "Modelo", sortable: true },
  { name: "Precio", uid: "Precio", sortable: true },
  { name: "Tiempo", uid: "Tiempo", sortable: true },
  { name: "Estado", uid: "Estado", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];
//
export const getlistarTicket = async () => {
  const response = await api.get("/centro-atencion/listarTicket");
  return response.data.Query3;
};

export const columnslistarTicket = [
  { name: "IdTicket", uid: "IdTicket", sortable: true },
  { name: "Titulo", uid: "Titulo", sortable: true },
  { name: "Descripcion", uid: "Descripcion", sortable: true },
  { name: "idUsuario", uid: "idUsuario", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];






*/
