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
  array: any;
  value: string;
  texts: string[];
  label: string;
  placeholder: string;
  prop: FieldValues;
}

export default function SelectMultipleComponent({
  array,
  value,
  texts,
  label,
  placeholder,
  prop,
}: Props) {
  return (
    <Select
      {...prop}
      items={array as any[]}
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
      renderValue={(items: any[]) => {
        return (
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <Chip key={item[value]}>{item[texts[0]]}</Chip>
            ))}
          </div>
        );
      }}
    >
      {(item) => (
        <SelectItem key={item[value]}>
          <div className="flex gap-2 items-center">
            <Avatar
              alt={item[texts[0]]}
              className="flex-shrink-0"
              size="sm"
              src={item.RutaImagen}
            />
            <div className="flex flex-col">
              <span className="text-small">{item[texts[0]]}</span>
              <span className="text-tiny text-default-400">
                {item[texts[1]]}
              </span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
}
