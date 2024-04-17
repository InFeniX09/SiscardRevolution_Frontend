import React, { useCallback } from "react";
import { RadioGroup, Radio } from "@nextui-org/react";

interface Props {
  data: any[];
  onRadioChange: (selectedValue: string) => void; // Agregar onSelectChange al tipo Props

}

export default function RadiogroupComponent({ data ,onRadioChange }: Props) {

  const handleRadioChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedValue = event.target.value;
      onRadioChange(selectedValue); // Llamar a onSelectChange con el valor seleccionado
    },
    [onRadioChange]
  );
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };
  return (
    <RadioGroup label="Elige el albarán de salida a imprimir" onChange={handleRadioChange}>
      {data.map((item) => (
        <Radio key={item.albaran_id} value={item.albaran_id} classNames={{label:"text-[0.85rem]"}}>
          {item.albaran_id+' | '+formatDate(item.dFcGeneracion)+' | '+item.usuario_id+' | '+formatDate(item.dFcUltimaImpresion)}
        </Radio>
      ))}
    </RadioGroup>
  );
}
