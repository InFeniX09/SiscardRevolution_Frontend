import { SocketContext } from "@/src/context/SocketContext";
import { Button, Input } from "@nextui-org/react";
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
    <div className="flex flex-col gap-3 items-center justify-center">
      <h1>Sube tu archivo en <span className="text-green-600">Excel</span> </h1>
      <Input type="file" onChange={handleFileUpload} />
      <Button onClick={logData}>Cargar datos</Button>
    </div>
  );
}
