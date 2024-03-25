interface columns {
  name: string;
  uid: string;
  sortable: boolean;
}
export const columnsMarca: columns[] = [
  { name: "IdMarca", uid: "IdMarca", sortable: true },
  { name: "Marca", uid: "Marca", sortable: true },
  { name: "TipoEquipo", uid: "TipoEquipo", sortable: true },
  { name: "Clasificacion", uid: "Clasificacion", sortable: true },
  { name: "Estado", uid: "Estado", sortable: true },
  { name: "ACTIONS", uid: "actions", sortable: false },
];
export const columnsModelo: columns[] = [
  { name: "IdModelo", uid: "IdModelo", sortable: true },
  { name: "Modelo", uid: "Modelo", sortable: true },
  { name: "Marca", uid: "Marca", sortable: true },
  { name: "TipoEquipo", uid: "TipoEquipo", sortable: true },
  { name: "Clasificacion", uid: "Clasificacion", sortable: true },
  { name: "Estado", uid: "Estado", sortable: true },
  { name: "ACTIONS", uid: "actions", sortable: false },
];
export const columnsTipoEquipo = [
  { name: "IdTipoEquipo", uid: "IdTipoEquipo", sortable: true },
  { name: "TipoEquipo", uid: "TipoEquipo", sortable: true },
  { name: "Clasificacion", uid: "Clasificacion", sortable: true },
  { name: "Estado", uid: "Estado", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];
export const columnsEquipo = [
  { name: "IdEquipo", uid: "IdEquipo", sortable: true },
  { name: "CodCliente", uid: "CodCliente", sortable: true },
  { name: "Marca", uid: "Marca", sortable: true },
  { name: "Modelo", uid: "Modelo", sortable: true },
  { name: "Especificacion", uid: "Especificacion", sortable: true },
  { name: "Estado", uid: "Estado", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const columnsEquipoStock = [
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

export const columnsEquipoControl = [
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

export const columnsEquipoDescuento = [
  { name: "IdEquipoDescuento", uid: "IdEquipoDescuento", sortable: true },
  { name: "Marca", uid: "Marca", sortable: true },
  { name: "Modelo", uid: "Modelo", sortable: true },
  { name: "Precio", uid: "Precio", sortable: true },
  { name: "Tiempo", uid: "Tiempo", sortable: true },
  { name: "Estado", uid: "Estado", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];
export const columnsTicket = [
  { name: "IdTicket", uid: "IdTicket", sortable: true },
  { name: "Asunto", uid: "Asunto", sortable: true },
  { name: "Descripcion", uid: "Descripcion", sortable: true },
  { name: "idUsuario", uid: "idUsuario", sortable: true },
  { name: "ACTIONS", uid: "actions", sortable: true },
];
