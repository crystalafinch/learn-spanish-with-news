import { CATEGORIES } from "@/app/consts";

export default function Navigation() {
  const categories = Object.values(CATEGORIES).map((category) => category.es);

  return (
    <nav className="border-y border-gray-200 py-3 dark:border-gray-700">
      <ul className="flex justify-center gap-5">
        {categories.map((category) => (
          <li key={category} className="relative top-[0.03em] leading-none">
            {category}
          </li>
        ))}
      </ul>
    </nav>
  );
}
