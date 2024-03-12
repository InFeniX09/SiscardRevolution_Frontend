"use client";
import { Checkbox } from "@nextui-org/react";

interface ImageProps {
  texto: string;
}

export default function CheckboxComponent({ texto }: ImageProps) {
  return (
    <Checkbox defaultSelected color="danger" classNames={{label: "text-white"}}>
      {texto}
    </Checkbox>
  );
}
