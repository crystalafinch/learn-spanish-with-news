"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CheckIcon, MoonIcon, SunIcon, MonitorIcon } from "lucide-react";

function ThemeIcon({ theme }: { theme: string }) {
  const iconSize = "size-4";
  switch (theme) {
    case "system":
      return <MonitorIcon className={iconSize} />;
    case "dark":
      return <MoonIcon className={iconSize} />;
    case "light":
      return <SunIcon className={iconSize} />;
    default:
      return null;
  }
}

export default function ThemeSelect() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const themeOptions = [
    { value: "system", label: "System" },
    { value: "dark", label: "Dark" },
    { value: "light", label: "Light" },
  ];

  useEffect(() => {
    // This pattern is required by next-themes to prevent hydration errors
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  if (!mounted) return null;

  return (
    <form noValidate>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full">
            <span className="sr-only">Select Theme</span>
            <ThemeIcon theme={theme ?? "system"} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Theme</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={theme ?? "system"}
            onValueChange={(value: string) => setTheme(value)}
          >
            {themeOptions.map((option) => (
              <DropdownMenuRadioItem
                key={option.value}
                value={option.value}
                indicatorIcon={<CheckIcon className="size-3" />}
              >
                {option.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </form>
  );
}
