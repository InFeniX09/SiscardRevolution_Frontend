"use client";
import {
  generarpdf,
  getlistarAlbaranSalidaxZona,
  getlistarAlmacenxAlbaranSalida,
  getlistarDatosPdfAlbaranSalida,
  getlistarDetalleAlbaranSalida,
} from "@/src/actions/logistica/guia-remision";
import ButtonComponent from "@/src/components/ui/Button/Button";
import RadiogroupComponent from "@/src/components/ui/Radiogroup/Radiogroup";
import SelectComponent from "@/src/components/ui/Select/Select";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [Albaranes, setAlbaranes] = useState<any>([]);
  const [radiogroupData, setRadiogroupData] = useState<any[]>([]);
  const [selectedGroupValue, setSelectedGroupValue] = useState<string>("");
  const [RadioGroupValue, setRadioGroupValue] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getlistarAlmacenxAlbaranSalida();
        setAlbaranes(response);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    // Only call fetchData when session.status changes from any value to 'authenticated'
    fetchData();
  }, []);

  

  const handleSelectChange = async (selectedValue: string) => {
    try {
      setSelectedGroupValue(selectedValue);
      const response = await getlistarAlbaranSalidaxZona(selectedValue);
      setRadiogroupData(response);
      console.log(radiogroupData);
    } catch (error) {
      console.error("Error fetching radiogroup data:", error);
    }
  };
  const handleRadioChange = async (selectedValue: string) => {
    try {
      setRadioGroupValue(selectedValue);
    } catch (error) {
      console.error("Error fetching radiogroup data:", error);
    }
  };
 


  const handleGenerarPDF = async () => {
    try {
      const pdetalle = await getlistarDetalleAlbaranSalida(RadioGroupValue);
      const pdatos = await getlistarDatosPdfAlbaranSalida(selectedGroupValue);
      
      const pdfBytes = await generarpdf(pdatos,pdetalle);
      const pdfBlob = new Blob([new Uint8Array(pdfBytes.data)], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);

      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'archivo.pdf';
      document.body.appendChild(link);
      link.click();

    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };
  
  return (
    <>
      <SelectComponent
        array={Albaranes}
        value="almacen_id"
        texts={["almacen_id", "sDsAlmacen", "cliente_id"]}
        label="Zona"
        placeholder="Seleccione una zona"
        prop={{}}
        onSelectChange={handleSelectChange}
      />
      <div className="bg-white w-full  border-[rgba(0,0,0,0.3)] border-2 rounded-xl p-4">
        <RadiogroupComponent data={radiogroupData}  onRadioChange={handleRadioChange}/>
      </div>
      <ButtonComponent texto="GenerarPDF" handleGenerarPDF={handleGenerarPDF}/>
    </>
  );
}
