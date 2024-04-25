import React, { useEffect, useState } from "react";
import { useTheme as useNextTheme } from "next-themes";
import { Switch } from "@nextui-org/react";

export const DarkModeSwitch = () => {
  const { setTheme, resolvedTheme } = useNextTheme();
  const [selectedswitch, setSelectedSwitch] = useState(false);

  useEffect(() => {
    setSelectedSwitch(resolvedTheme === "DarkPeru");
  }, [resolvedTheme]);

  return (
    <Switch
      color="danger"
      isSelected={selectedswitch}
      onValueChange={(e) => {
        setSelectedSwitch(e);
        setTheme(e ? "DarkPeru" : "LightPeru");
      }}
    />
  );
};
