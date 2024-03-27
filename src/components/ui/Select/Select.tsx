"use client"
import { Select, SelectItem } from "@nextui-org/react";
import { FieldValues } from "react-hook-form";


interface Props {
  array: any;
  value:string;
  text:string;
  label:string;
  placeholder:string;
  prop:FieldValues

  }

export default function SelectComponent({array,value,text,label,placeholder,prop}:Props) {
  return (
    <>
      <Select
        {...prop}
        items={array as any[]}
        label={label}
        placeholder={placeholder}
        className="max-w-xs"
        labelPlacement="outside"
      >
        {(item) => <SelectItem key={item[value]}>{item[text]}</SelectItem>}
      </Select>
    </>
  );
}
