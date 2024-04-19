import { PlusIcon } from "@heroicons/react/24/solid";
import { Checkbox } from "@nextui-org/react";
import { useCallback } from "react";

interface ImageProps {
  texto: string;
  isSelected: boolean;
  onValueChange: (isSelected: boolean) => void;
}

export default function CheckboxComponent({
  texto,
  isSelected,
  onValueChange,
}: ImageProps) {
  return (
    <Checkbox
      defaultSelected
      color="danger"
      classNames={{ label: "text-[var(--color-neutral)]" }}
      isSelected={isSelected}
      onValueChange={onValueChange}
      icon={<PlusIcon className="h-5"/>}
    >
      {texto}
    </Checkbox>
  );
}
