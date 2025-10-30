import { CATEGORIES } from "@/app/consts";

export default function Navigation() {
  const categories = Object.values(CATEGORIES).map((category) => category.es);

  return (
    <nav className="border-gray-200 dark:border-gray-700 border-y py-3">
      <ul className="flex justify-center gap-5">
        {categories.map((category) => (
          <li key={category} className="leading-none relative top-[0.03em]">
            {category}
          </li>
        ))}
      </ul>
    </nav>
  );
}
