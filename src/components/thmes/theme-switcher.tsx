'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSunBright, faMoon} from "@awesome.me/kit-2c9d26a98e/icons/classic/regular";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";


const ThemeSwitcher = () => {
  const {theme, setTheme} = useTheme();

  return (
    <Button
     aria-label="Toggle theme"
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <FontAwesomeIcon icon={faSunBright}
        className="h-4 w-4 rotate-0 scale-100 transition-all
        dark:rotate-90 dark:scale-0"
      />
      <FontAwesomeIcon icon={faMoon}
        className="absolute h-4 w-4 rotate-90 scale-0 transition-transoform
        dark:rotate-0 dark:scale-100" />
    </Button>
  );
};
export { ThemeSwitcher };
