"use client"
import { Select, SelectItem } from "@nextui-org/react";
import { animals } from "@/src/actions/auth/buscar-usuario";

interface Props{    
    array:Option[]
}
interface Option {
    name: string;
    digit: number;
  }
export default function SelectComponent({array}:Props) {
  return (
    <>
      <Select
        items={array}
        label="Dia"
        placeholder="Selecciona un dia"
        className="max-w-xs"
      >
        {(animal) => <SelectItem key={animal.digit}>{animal.name}</SelectItem>}
      </Select>
    </>
  );
}
