"use client"
import React from "react";
import { RadioGroup, Radio } from "@nextui-org/react";

interface Props {
  data: any[];
}

export default function RadiogroupComponent({ data }: Props) {
  return (
    <RadioGroup label="Elige el albarán de salida a imprimir">
      {data.map((item) => (
        <Radio key={item.albaran_id} value={item.albaran_id} classNames={{label:"text-[0.85rem]"}}>
          {item.albaran_id+' | '+item.dFcGeneracion+' | '+item.usuario_id+' | '+item.dFcUltimaImpresion}
        </Radio>
      ))}
    </RadioGroup>
  );
}
