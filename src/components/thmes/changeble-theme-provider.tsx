import { ThemeProvider } from "next-themes";
import type React from "react";

type ChangebleThemeProviderProps = {
  children: React.ReactNode;
};

const ChangebleThemeProvider = ({ children }: ChangebleThemeProviderProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
};

export { ChangebleThemeProvider };
