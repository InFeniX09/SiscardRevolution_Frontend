import { PlusIcon } from "@heroicons/react/24/solid";
import { Checkbox } from "@nextui-org/react";
import { useCallback } from "react";

interface ImageProps {
  texto: string;
  isselected: boolean;
  onValueChange: (isselected: boolean) => void;
}

export default function CheckboxComponent({
  texto,
  isselected,
  onValueChange,
}: ImageProps) {
  return (
    <Checkbox
      color="danger"
      classNames={{ label: "text-[var(--color-neutral)]" }}
      isSelected={isselected}
      onValueChange={onValueChange}
      icon={<PlusIcon className="h-5" />}
    >
      {texto}
    </Checkbox>
  );
}
