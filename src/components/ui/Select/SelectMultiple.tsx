"use client";
import React, { ReactNode, useEffect, useState } from "react";
import {
  Select,
  SelectItem,
  Avatar,
  Chip,
  SelectedItems,
} from "@nextui-org/react";

import { FieldValues } from "react-hook-form";

interface Props {
  array: any[]; // Ensure the type is an array
  value: string;
  texts: string[];
  subtexts: string[];
  label: string;
  placeholder: string;
  prop: FieldValues;
}

export default function SelectMultipleComponent({
  array,
  value,
  texts,
  subtexts,
  label,
  placeholder,
  prop,
}: Props) {
  return (
    <Select
      {...prop}
      items={array}
      label={label}
      variant="bordered"
      isMultiline={true}
      selectionMode="multiple"
      placeholder={placeholder}
      labelPlacement="outside"
      classNames={{
        base: "max-w-xs",
        trigger: "min-h-unit-12 py-2",
      }}
      renderValue={(items: any) => {
        return (
          <div className="flex flex-wrap gap-2">
            {items.map((item:any) => (
              <Chip key={item.key}>{texts.map((text) => item.data[text]).join(" - ")}</Chip>
            ))}
          </div>
        );
      }}
    >
      {(item: any) => (
        <SelectItem key={item[value]}>
          <div className="flex gap-2 items-center">
            <Avatar
              alt={item[texts[0]]}
              className="flex-shrink-0"
              size="sm"
              src={item.RutaImagen} // Assuming the image source property is 'RutaImagen'
            />
            <div className="flex flex-col">
              {/* Muestra los textos principales y subtextos */}

              <span className="text-small">
                {texts.map((text) => item[text]).join(" - ")}
              </span>

              <span className="text-small">
                {subtexts.map((subtext) => item[subtext]).join(" - ")}
              </span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
}
