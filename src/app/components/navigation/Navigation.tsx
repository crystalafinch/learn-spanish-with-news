"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { CATEGORIES } from "@/app/consts";

export default function Navigation() {
  const pathname = usePathname();
  const categories = Object.entries(CATEGORIES).map(([key, value]) => ({
    key: key === "world" ? "" : key,
    value,
  }));

  return (
    <nav className="border-y border-gray-200 py-3">
      <ul className="flex justify-center gap-5">
        {categories.map((category) => (
          <li key={category.key} className="relative top-[0.03em] leading-none">
            <Link
              href={`/${category.key}`}
              className={pathname === `/${category.key}` ? "underline" : ""}
            >
              {category.value.es}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
