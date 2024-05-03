import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

interface Props {
  array: any[];
  index: string;
  texts: string[];
  label: string;
  placeholder: string;
  value: any; // Nuevo prop para establecer el valor seleccionado
  onChange: (value: any) => void;
}

export default function SelectStateComponent({
  array,
  index,
  texts,
  label,
  placeholder,
  value, // Nuevo prop para establecer el valor seleccionado
  onChange, 
}: Props) {


  return (
    <div className="flex w-full  flex-col gap-2">
      <Select
        label={label}
        placeholder={placeholder}
        labelPlacement="outside"
        onSelectionChange={(keys) => onChange(Array.from(keys))}
        selectedKeys={value}
        color="danger"
      >
        {array.map((item) => (
          <SelectItem key={item[index]} value={item[index]}>
            {texts.map((text) => item[text]).join(" - ")}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
