import { Checkbox, CheckboxGroup} from "@nextui-org/react";
import { FieldValues } from "react-hook-form";
import React, { useCallback } from "react";

interface Props {
  array: any;
  value: string;
  texts: string[];
  label: string;
  placeholder: string;
  prop: FieldValues;
}

export default function CheckboxGroupComponent({
  array,
  value,
  texts,
  label,
  placeholder,
  prop,
}: Props) {
    return (
        <>
          {prop && (
            <CheckboxGroup
              {...prop}
              label={label}       
            >
              {array.map((index: number) => (
                <Checkbox key={index} >
                  {'a'}
                </Checkbox>
              ))}
            </CheckboxGroup>
          )}
        </>
      );
}
