"use client";
import React from "react";
import { Textarea } from "@nextui-org/react";

interface Props{
  label:string
}

export default function TextAreaNormalComponent({label}:Props) {

  return (
    <div className="w-full grid grid-cols-12 gap-4">
        <Textarea
          variant="flat"
          label={label}
          labelPlacement="outside"
          placeholder="Escriba"
          className="col-span-12 md:col-span-12 mb-6 md:mb-0 w-full"
        />
    </div>
  );
}

