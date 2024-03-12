"use client";
import { Button, ButtonGroup } from "@nextui-org/react";
interface ImageProps {
  texto: string;
}

export default function ButtonComponent({ texto }: ImageProps) {
  return (
    <Button color="primary" variant="ghost" className="text-white px-2">
      {texto}
    </Button>
  );
}
