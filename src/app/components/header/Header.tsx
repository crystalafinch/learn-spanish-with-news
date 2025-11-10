import Navigation from "@components/navigation/Navigation";
import DateComponent from "@components/date/Date";
import ThemeSelect from "@/app/components/theme-select/ThemeSelect";

export default function Header() {
  return (
    <header className="mb-4">
      <h1 className="font-display grow pt-12 pb-4 text-center text-[3.2em] leading-[1.1]">
        Aprende con Noticias
      </h1>
      <DateComponent className="absolute top-4 text-gray-400" />
      <ThemeSelect />
      <Navigation />
    </header>
  );
}
