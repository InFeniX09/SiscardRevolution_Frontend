"use client"
import { Button} from "@nextui-org/react";

interface ImageProps {
  texto: string;
}

export default function ButtonNormalComponent({
  texto,
}: ImageProps) {


  return (
    <Button
      color="danger"
      className="text-white px-2"
    >
      {texto}
    </Button>
  );
}