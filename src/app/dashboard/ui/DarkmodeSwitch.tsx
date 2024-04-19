import React from "react";
import { useTheme as useNextTheme } from "next-themes";
import { Switch } from "@nextui-org/react";

export const DarkModeSwitch = () => {
  const { setTheme, resolvedTheme } = useNextTheme();
  return (
    <Switch color="danger"
      isSelected={resolvedTheme === "DarkPeru" ? true : false}
      onValueChange={(e) => setTheme(e ? "DarkPeru" : "LightPeru")}
    />
  );
};
