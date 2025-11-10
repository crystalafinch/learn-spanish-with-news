import Navigation from "@components/navigation/Navigation";
import DateComponent from "@components/date/Date";
import ThemeSelect from "@/app/components/theme-select/ThemeSelect";

export default function Header() {
  return (
    <header className="mb-4">
      <div className="flex flex-col-reverse items-center gap-4 pt-4">
        <h1 className="font-display grow pt-8 pb-4 text-center text-[3.2em] leading-[1.1]">
          Aprende con Noticias
        </h1>
        <div className="flex w-full justify-between">
          <DateComponent className="text-gray-400" />
          <ThemeSelect />
        </div>
      </div>
      <Navigation />
    </header>
  );
}
