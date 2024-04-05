import { Select, SelectItem } from "@nextui-org/react";
import { FieldValues } from "react-hook-form";
import React, { useCallback } from "react";

interface Props {
  array: any;
  value: string;
  texts: string[];
  label: string;
  placeholder: string;
  prop: FieldValues;
  onSelectChange: (selectedValue: string) => void; // Agregar onSelectChange al tipo Props
}

export default function SelectComponent({
  array,
  value,
  texts,
  label,
  placeholder,
  prop,
  onSelectChange,
}: Props) {
  const handleSelectChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = event.target.value;
      onSelectChange(selectedValue); // Llamar a onSelectChange con el valor seleccionado
    },
    [onSelectChange]
  );

  return (
    <>
      <Select
        {...prop}
        items={array as any[]}
        label={label}
        placeholder={placeholder}
        className=""
        labelPlacement="outside"
        onChange={handleSelectChange}
      >
        {(item) => (
          <SelectItem key={item[value]}>
            {texts.map((text) => item[text]).join(" - ")}
          </SelectItem>
        )}
      </Select>
    </>
  );
}
