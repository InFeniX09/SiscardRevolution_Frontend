import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

interface Props {
  array: any[];
  label: string;
  placeholder: string;
}

export default function SelectStateComponent({
  array,
  label,
  placeholder,
}: Props) {
  const [value, setValue] = React.useState<any>([]);

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Select
        label={label}
        placeholder={placeholder}
        selectedKeys={value}
        className="max-w-xs"
        onSelectionChange={(keys) => setValue(Array.from(keys))}
        labelPlacement="outside"
      >
        {array.map((animal) => (
          <SelectItem key={animal.IdTipoEquipo} value={animal.IdTipoEquipo}>
            {animal.TipoEquipo}
          </SelectItem>
        ))}
      </Select>
      <p className="text-small text-default-500">Selected: {value}</p>
    </div>
  );
}
