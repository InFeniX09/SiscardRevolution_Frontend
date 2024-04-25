import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

interface Props {
  array: any[];
  index: string;
  texts: string[];
  label: string;
  placeholder: string;
}

export default function SelectStateComponent({
  array,
  index,
  texts,
  label,
  placeholder,
}: Props) {

  const [idTipoEquipo, setidTipoEquipo] = React.useState<any>([]);

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Select
        label={label}
        placeholder={placeholder}
        className="max-w-xs"
        labelPlacement="outside"
        onSelectionChange={(keys) => setidTipoEquipo(Array.from(keys))}
        selectedKeys={idTipoEquipo}
      >
        {array.map((item) => (
          <SelectItem key={item[index]} value={item[index]}>
            {texts.map((text) => item[text]).join(" - ")}
          </SelectItem>
        ))}
      </Select>
      <p className="text-small text-default-500">Selected: {idTipoEquipo}</p>
    </div>
  );
}
