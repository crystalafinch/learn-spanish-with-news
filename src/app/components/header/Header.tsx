import Navigation from "@components/navigation/Navigation";
import DateComponent from "@components/date/Date";

export default function Header() {
  return (
    <header className="mb-4">
      <h1 className="font-display pt-10 pb-2">Aprende con Noticias</h1>
      <DateComponent className=" text-gray-400 absolute top-4" />
      <Navigation />
    </header>
  );
}
