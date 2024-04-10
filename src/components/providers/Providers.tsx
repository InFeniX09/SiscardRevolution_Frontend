"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { SessionProvider } from "next-auth/react";
import { SocketProvider } from "@/src/context/SocketContext";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <NextUIProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="LightPeru"
        themes={[
          "LightPeru",
          "DarkPeru",
          "LightArgentina",
          "DarkArgentina",
          "system",
        ]}
        {...themeProps}
      >
        <SocketProvider>
          <SessionProvider>{children}</SessionProvider>
        </SocketProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
