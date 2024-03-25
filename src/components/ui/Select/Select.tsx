"use client"
import { Select, SelectItem } from "@nextui-org/react";


interface Props {
  array: any;
  value:string;
  text:string;
  label:string;
  placeholder:string;
  name:string
  }

export default function SelectComponent({array,value,text,label,placeholder,name}:Props) {
  return (
    <>
      <Select
        items={array as any[]}
        label={label}
        placeholder={placeholder}
        className="max-w-xs"
        labelPlacement="outside"
        name={name}
      >
        {(item) => <SelectItem key={item[value]}>{item[text]}</SelectItem>}
      </Select>
    </>
  );
}
