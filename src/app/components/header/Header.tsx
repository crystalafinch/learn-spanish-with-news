import Navigation from "@components/navigation/Navigation";
import DateComponent from "@components/date/Date";

export default function Header() {
  return (
    <header className="mb-4">
      <h1 className="font-display grow text-[3.2em] leading-[1.1] text-center pt-12 pb-4">
        Aprende con Noticias
      </h1>
      <DateComponent className=" text-gray-400 absolute top-4" />
      <Navigation />
    </header>
  );
}
