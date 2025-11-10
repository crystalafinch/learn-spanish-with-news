"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeSelect() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) return null;

  return (
    <form noValidate>
      <label htmlFor="dark-mode-toggle">
        Toggle Dark Mode ({theme ?? "system"})
      </label>
      <select
        id="dark-mode-toggle"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      >
        <option value="system">System</option>
        <option value="dark">Dark 🌙</option>
        <option value="light">Light ☀️</option>
      </select>
    </form>
  );
}
