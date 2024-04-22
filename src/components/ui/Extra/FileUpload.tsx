import { SocketContext } from "@/src/context/SocketContext";
import React, { useContext, useState } from "react";
import { read, utils } from "xlsx";

export default function ExcelCarga() {
  const [dataexcel, setDataExcel] = useState<any>([]);
  const { socket } = useContext(SocketContext);

  const handleFileUpload = (e:any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event:any) => {
      const data = event.target.result;
      const dataUint8 = new Uint8Array(data);
      const workbook = read(dataUint8, { type: "array" });
      const firstSheet = workbook.SheetNames[0];
      const excelRows = utils.sheet_to_json(workbook.Sheets[firstSheet], {
        raw: false,
        dateNF: "DD/MM/YYYY",
      });
      setDataExcel(excelRows);
    };
    reader.readAsArrayBuffer(file);
  };

  const logData = () => {
    console.log(dataexcel)
    socket?.emit("cargamasiva-equipo", dataexcel, (ticket: any) => {
        console.log(ticket);
      });
  };

  return (
    <div>
      <h1>Subir archivo Excel</h1>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={logData}>Mostrar datos</button>
    </div>
  );
}
