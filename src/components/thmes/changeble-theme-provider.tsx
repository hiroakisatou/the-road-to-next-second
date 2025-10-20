import { ThemeProvider } from "next-themes";
import React from "react";

type ChangebleThemeProviderProps = {
  children: React.ReactNode;
}

const ChangebleThemeProvider = ({ children }: ChangebleThemeProviderProps) => {
  return (
    // biome-ignore lint/style/useNamingConvention: This is a component
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}

export { ChangebleThemeProvider };
