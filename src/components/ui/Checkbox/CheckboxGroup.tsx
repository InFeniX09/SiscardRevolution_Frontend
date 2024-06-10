import React from "react";
import { Checkbox, CheckboxGroup, Select, SelectItem } from "@nextui-org/react";

interface Props {
  array: any[];
  index: string;
  texts: string[];
  label: string;
  value: any;
  onChange: (value: any) => void;
}

export default function CheckboxGroupComponent({
  array,
  index,
  texts,
  label,
  value,
  onChange, 
}: Props) {

  return (
    <div className="flex w-full flex-col gap-2">
      <CheckboxGroup
        label={label}
        onChange={(keys) => onChange(Array.from(keys))}
        value={value}
      >
        {array.map((item) => (
          <Checkbox key={item[index]} value={item[index]}>
            {texts.map((text) => item[text]).join(" - ")}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </div>
  );
}
